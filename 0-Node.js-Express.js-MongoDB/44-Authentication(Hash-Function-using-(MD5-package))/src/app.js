require('dotenv').config()
const express = require('express');

const usersRouter = require('./routes/users.route.js')

const app = express();

//middlewares 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
app.use('/users', usersRouter);


//home route
app.get('/',(req, res)=>{
    res.send('<h1>Hello World</h1>')
}) 

// Invalid route handler (404)
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    success: false
  });
});


// Global error handler (500)
app.use((error, req, res, next) => {
  res.status(500).json({
    message: "Server error occurred",
    success: false,
    error: error.message
  });
});

module.exports = app;