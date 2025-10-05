require('dotenv').config()
const express = require('express') 
const cors = require('cors')
const app = express()

const usersRouter = require('./routes/users.route');


//middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }));app.use(express.json())


//users route
//http://localhost:3000/users
app.use('/users',usersRouter)


//home route 
app.get('/', (req, res)=>{
    res.send('<h1>Home Route</h1>')
})

//invalid route handle
app.use((req, res, next)=>{
    res.status(404).json({
        message: "Route is not valid"
    })
})

// server error handle
app.use((error, req, res,next)=>{
    res.status(500).json({
        message: "Server is crashed"
    })
})

module.exports = app;