const { check } = require("express-validator");


//Rules is here for validation
const userRegisterValidator = [
    //input validation
      //for username
      check("username")
        .trim()
        .notEmpty()
        .withMessage("username is missing, enter username")
        .isLength({ min: 5 })
        .withMessage("username must have at least 5 characters")
        .isLength({ max: 10 })
        .withMessage("Max length of username must be 10 of less"),
    
      //for email
      check("email")
        .trim()
        .notEmpty()
        .withMessage("email is missing, enter email")
        .isEmail()
        .withMessage("Invalid email address"),
    
      //for password
      check("password")
        .trim()
        .notEmpty()
        .withMessage("password is missing, enter password")
        .isLength({ min: 6 })
        .withMessage("password must have at least 6 characters"),
    
      //date of birth
      check("dob")
        .trim()
        .notEmpty()
        .withMessage("dob is missing, enter dob")
        .isISO8601() //format->>>> 2001-12-23
        .toDate()
        .withMessage("Not a valid dob"), //
    
]


const userLoginValidator = [
    //input validation
      //for email
      check("email")
        .trim()
        .notEmpty()
        .withMessage("email is missing, enter email")
        .isEmail()
        .withMessage("Invalid email address"),
    
      //for password
      check("password")
        .trim()
        .notEmpty()
        .withMessage("password is missing, enter password")
        .isLength({ min: 6 })
        .withMessage("password must have at least 6 characters"),
    
]

module.exports = {userRegisterValidator,userLoginValidator}