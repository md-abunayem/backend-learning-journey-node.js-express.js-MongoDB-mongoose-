const express = require("express");
const {homePage} = require("../controllers/home.controllers");

const router = express.Router();

router.get("/", homePage)

module.exports = router;