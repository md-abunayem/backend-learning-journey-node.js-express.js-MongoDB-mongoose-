const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name : {
        type : String,
        required:[true, 'Please enter name here']
    },
    email : {
        type : String,
        unique: true,
        required:[true, 'Please enter name here']
    },
    file:{
        type : String,
        required: [true, "File is required"]
    }
},{timestamps: true})

const Users = mongoose.model("Users", usersSchema)

module.exports = Users;