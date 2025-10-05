const { v4: uuidv4 } = require('uuid');
let users = require('../models/users.model.js');


//for get req
const getUsers = (req, res)=>{
    res.status(200).json({
        users
    })
}

//for post req
const addUser = (req, res)=>{
    
    const newUser = {
        id : uuidv4(),
        username : req.body.username,
        email: req.body.email
    }
    users.push(newUser)
    res.status(200).json(users)
}

//for put req
const updateUser = (req, res)=>{
    const userId = req.params.id;
    const {username, email} = req.body;  //new data comes from front-end(user)
    // console.log(userId);        //use postman to send id
    users.filter((user)=>user.id === userId)
    .map((selectedUser)=>{
        selectedUser.username = username
        selectedUser.email = email 
    })
    res.status(200).json(users)
}

//for delete req
const deleteUser = (req, res)=>{
    const userId = req.params.id
    users = users.filter((user)=>user.id !== userId)
    
    res.status(200).json(users)
}



module.exports = {getUsers, addUser, updateUser, deleteUser};