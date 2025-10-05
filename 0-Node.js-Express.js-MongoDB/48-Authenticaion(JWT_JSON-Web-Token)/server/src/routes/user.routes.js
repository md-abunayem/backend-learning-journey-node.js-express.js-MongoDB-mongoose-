const express = require("express");
const passport = require("passport")
const jwt = require("jsonwebtoken");


const {registerUser, loginUser, userProfile} = require("../controllers/user.controllers.js")

const userRouter = express.Router();

//register user
userRouter.post("/register", registerUser);

//login user
userRouter.post("/login", loginUser)

//protected route ->> profile
userRouter.get("/profile",
    passport.authenticate('jwt', {session: false})
    ,userProfile);

module.exports = userRouter;