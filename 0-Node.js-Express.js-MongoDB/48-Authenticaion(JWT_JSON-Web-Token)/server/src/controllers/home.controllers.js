const express = require("express");

const homePage = (req, res) => {
  res.send("This is home route.....Server is working!");
}

module.exports = { homePage };