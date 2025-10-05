//external module
const express = require('express');
const app = express();
const PORT = 3000;

//middleware 
//Properties: 1. Order matters 2. Can not call next() after send() 3. "/" matches everything(global) 4. when calling res.send implicily calls res.end()

app.use("/",(req, res, next)=>{
    console.log("Inside first Middleware:", req.url, req.method);
    res.send("<p>Welcome to first middleware</p>")
    // next();      //cannot call next() after sending a response with res.send() or res.end().
})

app.use("/",(req, res, next)=>{
    console.log("Inside second Middleware:", req.url, req.method);
    res.send("<p>Welcome to second middleware</p>")
    // next();      //cannot call next() after sending a response with res.send() or res.end().
})


//🛑 This never runs, because the first middleware handles and ends the response.
app.use("/submit-details", (req, res, next)=>{
    console.log("Inside Third Middleware:", req.url, req.method)
    res.end("Response from third middleware");
})



app.listen(PORT, ()=>{    // The server is created inside this line
    console.log(`Server is runnig at: http://localhost:${PORT}`)
})