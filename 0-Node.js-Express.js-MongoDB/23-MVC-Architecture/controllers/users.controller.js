const path = require('path');
const users = require('../models/users.model.js')

const getUsers = (req, res)=>{
    res.sendFile(path.join(__dirname, "/../views", 'form.html'))
}

const saveUser = (req, res)=>{
    // console.log(req.body);

    const newUser = req.body;
    users.push(newUser)
    res.send(users)
}

module.exports = {getUsers, saveUser}
