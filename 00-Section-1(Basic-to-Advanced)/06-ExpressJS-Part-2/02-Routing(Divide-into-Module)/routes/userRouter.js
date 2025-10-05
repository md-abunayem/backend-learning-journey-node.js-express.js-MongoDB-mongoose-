const express = require('express');
const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  console.log(req.url, req.method);
  res.send(`
    <h1>Welcome to Airbnb</h1>                             <!-- Fixed typo: Airbnb -->
    <a href="/host/add-home">Add Home</a>                  <!-- Correct link to host route -->
  `);
});

module.exports = userRouter;
