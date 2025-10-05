import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

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

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
    throw new ApiError(500, "Could not upload avatar, please try again")
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    email,fullName,password,
    avatar : avatar.url,
    coverImage: coverImage?.url || ""
    });

  const cretedUser = await User.findById(user._id).select("-password -refreshToken -__v");

  if (!cretedUser) {
    throw new ApiError(500, "User not created while registering the user, please try again");
  }

  res.status(201).json(
    new ApiResponse(201, cretedUser, "User registered successfully")
  )
});

export { registerUser };
