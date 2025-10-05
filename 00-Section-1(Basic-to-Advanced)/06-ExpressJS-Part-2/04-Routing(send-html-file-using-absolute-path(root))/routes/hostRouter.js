//core module
const path = require('path')

//external module
const express = require('express');
const hostRouter = express.Router();


//local modules
const rootDir = require('../util/pathUtil');

hostRouter.get("/add-home", (req, res, next)=>{
  console.log(req.url, req.method);
  res.sendFile(path.join(rootDir,'views', 'addHome.html'))
})

hostRouter.post("/add-home", (req, res, next)=>{
  console.log(req.url, req.method);
  const houseName = req.body.houseName;                    // Read form data from request body
  console.log(houseName)
  res.sendFile(path.join(rootDir,'views', 'successfulMsg.html'))
})

module.exports = hostRouter;
