// const express = require('express');
const User = require("../models/users.model")

const registerUser = async(req, res)=>{
    try {
        const newUser = new User(req.body);
        await newUser.save()
        
        res.status(201).json({data: newUser, success: true, message:"New user is added"})
    } catch (error) {
        res.status(500).json({
            message: "Server is broken",
            error: error.message
        })
    }

}


const loginUser = async(req, res)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email: email})

    if(user && user.password === password){
        res.status(200).json({
            message:  "Login successful",
            success : true,
            status: "Valid user",
            data: user
        })
    }else{
        res.status(404).json({
            message: "Login not successful",
            success : true,
            status: "Invalid user"
        })
    }
}

const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find();
        if(users.length ===0 ){
           return res.status(404).json({
                message: "User not found",
                success : false
            })
        }
        res.status(200).json({
            message: "Users finding successful",
            success: true,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error occurred",
            success : false
        })
    }
}


module.exports = {registerUser, loginUser,getAllUsers}