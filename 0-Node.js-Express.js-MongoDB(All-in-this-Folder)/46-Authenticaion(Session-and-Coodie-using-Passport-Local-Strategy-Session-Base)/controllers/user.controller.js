const User = require("../models/user.model");
const bcrypt = require("bcrypt");



// Register : (POST)
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate fields
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already registered");
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // 5. Redirect to login page
    res.redirect("login");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Server error occurred");
  }
};

module.exports = { registerUser };
