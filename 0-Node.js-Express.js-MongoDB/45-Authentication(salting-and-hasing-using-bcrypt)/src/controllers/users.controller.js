// const express = require('express');
const User = require("../models/users.model");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();

    res
      .status(201)
      .json({ data: newUser, success: true, message: "New user is added" });
  } catch (error) {
    res.status(500).json({
      message: "Server is broken",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: "User is not found. Not a valid user!!!",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return res.status(200).json({
        message: "Login successful",
        success: true,
        data: user,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect password!",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server errror is occurred",
      success: false,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Users finding successful",
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error occurred",
      success: false,
    });
  }
};

module.exports = { registerUser, loginUser, getAllUsers };
