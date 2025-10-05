require('dotenv').config()
const express = require('express')
const cors = require('cors')
require("./db.js");

//core module
const path = require('path')

//local module
const usersRouter = require('./routes/users.routes.js')


const app = express()

//middlewares
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json());



//home route
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

//routes
//http://localhost:4000/users
app.use('/users', usersRouter)

//invalid route
app.use((req, res, next)=>{
    res.status(404).json({
        message: 'Route is not valid(found)'
    })
})

//server error
app.use((error, req, res, next)=>{
    res.status(500).json({
        message: 'server error is occured'
    })
})

module.exports = app;