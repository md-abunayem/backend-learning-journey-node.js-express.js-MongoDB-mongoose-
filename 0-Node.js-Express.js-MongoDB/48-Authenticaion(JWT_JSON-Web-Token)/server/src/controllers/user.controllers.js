const User = require("../models/user.models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //create new user and save to db
    const newUser = await new User({ username, email, password: hashedPassword }).save();
    
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Register user controller is not working",
      error: error.message,
    });
  }
};

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        //check if user exists
        const existingUser = await User.findOne({email: email});
        if(!existingUser){
            return res.status(400).json({
                success: false,
                message: "User does not exist, please register first"
            });
        }

        //compare password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials(password), please try again"
            });
        }

        const payload = {
          id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email
        }

        //generate jwt token
        const secretOrPrivateKey = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secretOrPrivateKey, {
          expiresIn: '1h'
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            // user: payload,
            token: "Bearer " + token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login user controller is not working",
            error: error.message,
          });
    }
};

// protected route profile
const userProfile = async(req, res) => {
  // console.log("req.user:", req.user);
  res.status(200).send({
    success:true,
    user: {
      id: req.user._id,
      username : req.user.username,
      email: req.user.email
    }
  })
}

// const userProfile = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized: User not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user: {
//         id: req.user._id,
//         username: req.user.username,
//         email: req.user.email
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error in user profile route",
//       error: error.message
//     });
//   }
// };


module.exports = {registerUser, loginUser, userProfile};
