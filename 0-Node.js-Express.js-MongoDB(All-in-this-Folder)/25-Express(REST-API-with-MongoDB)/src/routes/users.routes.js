const express = require('express');
const router = express.Router();

const {getAllUsers, getOneUser,createUser,deleteOneUser, updateUser} = require('../controllers/users.controllers')


//http://localhost:4000/users
router.get('/',getAllUsers)
//http://localhost:4000/users/688a5d3ba691d68df9c0801e
router.get('/:id',getOneUser)
router.post('/',createUser)
//http://localhost:4000/users/688a5d3ba691d68df9c0801e
router.delete('/:id',deleteOneUser)
router.put("/:id", updateUser)    //can use put and patch here without changing code of controller file

module.exports = router;