const userRegistration = (req, res) => {
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


  //login
  const userLogIn = (req, res) => {
    try {
      const { email, password } = req.body;
      if (email === "nayem@gmail.com" && password === "123456") {
        res.status(200).json({
            message: "User is loggedin",
        });
      }else {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    } catch (error) {
      res.status(400).json({ message: "Error occured" });
    }
  }

  module.exports = {userRegistration, userLogIn};