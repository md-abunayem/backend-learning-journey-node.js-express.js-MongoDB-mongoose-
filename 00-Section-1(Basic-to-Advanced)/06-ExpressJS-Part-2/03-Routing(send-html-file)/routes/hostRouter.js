//core module
const path = require('path')

//external module
const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next)=>{
  console.log(req.url, req.method);
  res.sendFile(path.join(__dirname, '../','views', 'addHome.html'))
})

hostRouter.post("/add-home", (req, res, next)=>{
  console.log(req.url, req.method);
  const houseName = req.body.houseName;                    // Read form data from request body

  res.sendFile(path.join(__dirname, '../','views', 'successfulMsg.html'))
})

module.exports = hostRouter;
