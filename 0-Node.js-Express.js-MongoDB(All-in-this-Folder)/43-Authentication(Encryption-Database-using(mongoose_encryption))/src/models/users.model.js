const mongoose = require('mongoose')
var encrypt = require('mongoose-encryption');

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        unique: true,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    },
},{timestamps:true});

const secret_key = process.env.SECRET_KEY;
userSchema.plugin(encrypt,{secret: secret_key, encryptedFields:['password']});

const User = mongoose.model('User', userSchema);

module.exports = User;