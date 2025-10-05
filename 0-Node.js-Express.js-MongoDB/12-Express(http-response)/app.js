const express = require('express')
const app = express()
const userRouter = require('./routes/user.route.js')

const path = require('path')  //core module of node.js

//http://localhost:3000/ 
app.get('/',(req, res)=>{
    res.send('<h1>The Home route</h1>')
})

//http://localhost:3000/api/user/login
app.use("/api/user",userRouter);


//*****************For response****************** */
//http://localhost:3000/register
app.get('/register', (req, res)=>{
    // res.status(200).json({
    //     message: "Welcome",
    //     statusCode : 200
    // })

    // setTimeout(()=>{
    //     res.redirect("/login")
    // },1000)

    res.sendFile(path.join(__dirname, 'views', 'register.html'))
})

//http://localhost:3000/login
app.get('/login', (req, res)=>{
    // res.status(200).json({    //res.status(code)->method
    //     message: "Successful",
    //     statusCode : 200
    // })

    // res.sendFile(__dirname + '/views' + '/login.html')
    
    res.statusCode = 200;  //a number property
    res.sendFile(path.join(__dirname, 'views', 'login.html'))

    res.cookie('Name', "Nayem")   //key and value
    res.cookie('Id', "124343")
    res.clearCookie('Id')


    //header as response
    res.header('Content-Type', 'application/json')
    res.append('Id', '1234343')  //res.append(field, value);
    //res.append() is an Express response method used to add a value to an existing HTTP header without replacing the existing value(s).

    //Set multiple headers at once
    /*
    res.set({
    'Content-Type': 'application/json',
    'X-Custom-Header': 'MyValue'
    });
    */
})

//*********************************************** */
app.use((req, res)=>{
    res.status(404).json({
        success : false,
        message : "Route not found"
    })
})



module.exports = app;