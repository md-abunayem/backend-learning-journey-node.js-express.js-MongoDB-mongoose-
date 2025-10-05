import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

//access token and refresh token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken(); //from model method
    const refreshToken = await user.generateRefreshToken(); //feom model method

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); //save refresh token in db against user

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Could not generate access and refresh token, please try again"
    );
  }
};

//register
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validatation - not empty
  // check user already exists: username , email
  // check for images, check for avater
  // upload them to cloudinary
  // create user object and save to db
  // remove password and refresh token from response
  // check for user creation (created or not)
  // return response
  const { userName, email, fullName, password } = req.body;

  // if(fullName === ""){
  //     throw new ApiError(400, "Full name is required")
  // }

  if (
    //returns true or false
    [userName, email, fullName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ $or: [{ userName }, { email }] });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  console.log(avatarLocalPath);

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Could not upload avatar, please try again");
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    email,
    fullName,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -__v"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "User not created while registering the user, please try again"
    );
  }

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

//login
const loginUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validatation - not empty(email, username)
  // check user exists: username , email
  // check for password match
  // generate access token and refresh token
  // save refresh token in db against user
  // return response with access token and refresh token in http only cookie -> send cookie

  const { userName, email, password } = req.body;

  if (!userName && !email) {
    throw new ApiError(400, "Username and email are required");
  }

  //Alternative way: using or condition(only one is required)
  // if(!(userName || email)){
  //   throw new ApiError(400, "Username or email are required")
  // }

  const user = await User.findOne({ $or: [{ userName: userName }, { email }] });

  if (!user) {
    throw new ApiError(404, "User not found with this username or email");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  //find the user again with access and refresh token
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -__v"
  );

  const options = {
    // cookie options
    httpOnly: true, // not accessible via JS/frontend
    secure: true, // only sent over https
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged in successfully"
      )
    );
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined, //remove refresh token from db
      },
    },
    {
      new: true, //return the updated document
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

//generate new access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken; //incoming refresh token from cookie or body which is sent from frontend or postman o

    if (!incomingRefreshToken) {
      new ApiError(400, "Unauthorized request - missing refresh token");
    }

    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decidedRefreshToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnlyt: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, newRefreshToken },
          "New access token generated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Unauthorized request - failed to refresh access token"
    );
  }
});

//update/change password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  //take old password and new password from front end
  //validate them ->> not empty
  //determine user using req.user(auth middleware)
  //validate old password with user password
  //is valid user
  //change/update password
  //save to the database

  const { oldPassword, newPassword } = req.body;
  // const {oldPassword, newPassword, confirmPassword} = req.body;
  // if(newPassword !== confirmPassword){
  //   throw new ApiError(
  //     400,
  //     "New Password and Confirm Password do not match"
  //   )
  // }

  if (!oldPassword || !newPassword) {
    throw new ApiError(404, "password and new password are invalid/empty");
  }

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password Changed successfully"));
});

//determine/get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      req.user, //( from auth middleware)
      "Current user fetched successfully"
    )
  );
});

//update account details
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "All fields are requird");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email: email,
      },
    },
    {
      new: true, //return new updated document
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

//for file updation like image, audio, video->> use different controller(for production level app)
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath); //cloudinary returns an oject with url of the file, then we assing it to  the avatar
  
  console.log(avatar);
  if(!avatar.url){
    throw new ApiError(
      400,
      "Error while uploading avatar on cloudinary"
    )
  }

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar : avatar.url
      }
    },
    {new : true}
  ).select("-password");
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath); //cloudinary returns an oject with url of the file, then we assing it to  the cover image
  
  console.log(coverImage);
  if(!coverImage.url){
    throw new ApiError(
      400,
      "Error while uploading coover image on cloudinary"
    )
  }

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage : coverImage.url
      }
    },
    {new : true}
  ).select("-password");
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage
};
