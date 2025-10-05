const express = require('express')
const app = express()
const userRouter = require('./routes/user.route.js')

//http://localhost:3000/ 
app.get('/',(req, res)=>{
    res.send('<h1>The Home route</h1>')
})

//http://localhost:3000/api/user/login
app.use("/api/user",userRouter);

app.use((req, res)=>{
    res.status(404).json({
        success : false,
        message : "Route not found"
    })
})



module.exports = app;