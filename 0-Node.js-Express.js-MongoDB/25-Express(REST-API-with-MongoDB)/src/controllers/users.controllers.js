const User = require("../models/users.model.js");

//get
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Get all users from DB
    res.status(200).json(users); // Send them as JSON response
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//post
const createUser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      age: Number(req.body.age),
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({ user }); //inside another obj-> this wraps the user object inside another object with a key "user".
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//delete user
const deleteOneUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({ message: "User is deleted " }); //inside another obj-> this wraps the user object inside another object with a key "user".
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.age = Number(req.body.age);
    await user.save();
    
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//use this code for manually generated id(uuid) of using any field
/*
syntax:
User.findOne({ email: "user@gmail.com" }) // Find by email
User.findOne({ _id: "688a5d3ba691d68df9c0801e" }) // Can also find by _id
*/

// const getOneUser = async (req, res) => {
//   try {
//     const user = await User.findOne({ id: req.params.id });
//     res.status(200).json({
//       user,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

module.exports = {
  createUser,
  getOneUser,
  getAllUsers,
  deleteOneUser,
  updateUser,
};
