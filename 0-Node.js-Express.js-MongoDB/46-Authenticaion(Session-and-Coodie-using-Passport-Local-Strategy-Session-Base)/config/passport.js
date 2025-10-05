const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user.model.js");

passport.use(
  new LocalStrategy({usernameField:"email"
  },   // <-- Tell passport to use 'email' instead of 'username'
    async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      if (err) {
        return done(err);
      }
    }
  })
);


//create session id
//whenever we login it creates user id inside session
passport.serializeUser((user, done)=>{
    done(null, user.id)
});

//find session info using session id
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (error) {
        done(error, false);
    }
})
