const User = require('../models/users.model.js') 
const express = require('express')
const router = express.Router();

const {registerUser,loginUser,getAllUsers} = require("../controllers/users.controller.js")

router.post('/register', registerUser)

//login
router.post("/login",loginUser)

router.get('/', getAllUsers)


module.exports = router;