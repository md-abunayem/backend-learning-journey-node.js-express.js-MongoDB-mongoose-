const express = require('express')
const router = express.Router()

const { userRegisterValidator, userLoginValidator } = require('../validations/authValidation');
const { validate } = require('../validations/validation');
const { userRegistration, userLogIn } = require('../controllers/user.controller');



//take username, email, password, dob from client
router.post(
  "/register",
  validate,
  userRegisterValidator,
  validate,
    userRegistration
);

//login
router.post(
  "/login",
  userLoginValidator,
  validate,
    userLogIn
  
);


module.exports = router