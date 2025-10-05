const express = require('express')

const PORT = 3000;
const app = express()

//middleware 
app.use(express.urlencoded({extended:true}))

app.get('/register', (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post('/register', (req, res)=>{
    console.log(req.body)

    const {name, age, email} = req.body;
    res.send(`<h1>Your Name: ${name} <br>Age: ${age} <br> Email: ${email}</h1>`)
})


app.listen(PORT, ()=>{
    console.log(`Server is runnig at port: http://localhost:${PORT}`)
})


/*
📦 Real-Life Analogy
Imagine /register as a physical registration counter:

GET /register = You walk up to the counter and get the form to fill out.

POST /register = You submit the filled form back at the same counter.*/