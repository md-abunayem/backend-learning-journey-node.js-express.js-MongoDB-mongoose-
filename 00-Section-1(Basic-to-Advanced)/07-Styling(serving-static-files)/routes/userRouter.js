//core module
const path = require('path')

//local module
const rootDir = require('../util/pathUtil')

const express = require('express');
const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  console.log(req.url, req.method);
  res.sendFile(path.join(rootDir, 'views', 'home.html'));
});

module.exports = userRouter;
