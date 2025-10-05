require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");

const connectDB = require("./config/db"); // ⬅️ Import DB connection
const homeRouter = require("./routes/home.routes");

const { notFound, errorHandler } = require("./middlewares/error.middlewares");
const userRouter = require("./routes/user.routes");

const app = express();

//connect database
connectDB();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

require("./config/passport")  //passport config

//routes
app.use("/", homeRouter);
app.use(userRouter)


// Error middlewares 
app.use(notFound)
app.use(errorHandler);


module.exports = app;