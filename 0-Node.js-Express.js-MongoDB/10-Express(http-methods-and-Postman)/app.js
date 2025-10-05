const express = require('express')

const app = express()


//use postman to see the responses which all the method provide
app.get("/",(req, res)=>{
    res.send("This is the get request....")     //we do not need to use res.end() because of res.send() and res.json()automatically end the response
})
app.post("/",(req, res)=>{
    res.send("This is the post request....")
})
app.put("/",(req, res)=>{
    res.send("This is the put request....")   //update
})
app.delete("/",(req, res)=>{
    res.send("This is the delete request.....");
})

module.exports = app;