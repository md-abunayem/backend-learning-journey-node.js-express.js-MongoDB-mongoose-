const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();

const PORT = 3000;

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

//take username, email, password, dob from client
app.post(
  "/api/register",
  //input validation
  //for username
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is missing, enter username")
    .isLength({ min: 5 })
    .withMessage("username must have at least 5 characters")
    .isLength({ max: 10 })
    .withMessage("Max length of username must be 10 of less"),

  //for email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is missing, enter email")
    .isEmail()
    .withMessage("Invalid email address"),

  //for password
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is missing, enter password")
    .isLength({ min: 6 })
    .withMessage("password must have at least 6 characters"),

  //date of birth
  body("dob")
    .trim()
    .notEmpty()
    .withMessage("dob is missing, enter dob")
    .isISO8601() //format->>>> 2001-12-23
    .toDate()
    .withMessage("Not a valid dob"), //

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  (req, res) => {
    try {
      const { username, email, password, dob } = req.body;
      const newUser = {
        username,
        email,
        password,
        dob,
      };
      res.status(200).json({
        message: "User is created",
        newUser,
      });
    } catch (error) {
      res.status(400).json({ message: "Error occured" });
    }
  }
);

//login
app.post(
  "/api/login",
  //input validation
  //for email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is missing, enter email")
    .isEmail()
    .withMessage("Invalid email address"),

  //for password
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is missing, enter password")
    .isLength({ min: 6 })
    .withMessage("password must have at least 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },

  (req, res) => {
    try {
      const { email, password } = req.body;
      if (email === "nayem@gmail.com" && password === "123456") {
        res.status(200).json({
            message: "User is loggedin",
        });
      }
    } catch (error) {
      res.status(400).json({ message: "Error occured" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
