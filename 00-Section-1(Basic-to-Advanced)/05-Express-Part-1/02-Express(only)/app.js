//external module
const express = require('express');
const app = express();
const PORT = 3000;

//middleware 
app.use((req, res, next)=>{
    console.log("Inside first Middleware:", req.url, req.method);
    res.send("<p>Welcome to first middleware</p>")
    // next();      //cannot call next() after sending a response with res.send() or res.end().
})


//🛑 This never runs, because the first middleware handles and ends the response.
app.use((req, res, next)=>{
    console.log("Inside second Middleware:", req.url, req.method)
    res.end("Response from second middleware");
})



// const server = http.createServer((req,res)=>{
//     console.log(req.url);
//     res.statusCode = 200;
//     res.setHeader('Content-Type', "text/plain");
//     res.end("Hello from Node.js core HTTP server");
// })


// const server = http.createServer(app)     //no need to create server manually in express

// server.listen(PORT, ()=>{
//     console.log(`Server is runnig at: http://localhost:${PORT}`)
// })

app.listen(PORT, ()=>{    // The server is created inside this line
const app = express();
    console.log(`Server is runnig at: http://localhost:${PORT}`)
})