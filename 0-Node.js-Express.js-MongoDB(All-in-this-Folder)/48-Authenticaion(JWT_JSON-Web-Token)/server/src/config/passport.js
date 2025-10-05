
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("../models/user.models");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      // console.log("JWT Payload:", jwt_payload);

      const user = await User.findById(jwt_payload.id).exec();
      // console.log("User found in DB:", user);

      if (!user) {
        return done(null, false); // no user found
      }

      return done(null, user); // attach user to req.user
    } catch (err) {
      console.error("Error in JWT strategy:", err);
      return done(err, false);
    }
  })
);
