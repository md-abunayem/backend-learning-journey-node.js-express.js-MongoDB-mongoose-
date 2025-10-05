const express = require('express');
const areaRouter = require('./routes/area.route.js')

const app = express()

// ✅ Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.use(areaRouter)

module.exports = app;