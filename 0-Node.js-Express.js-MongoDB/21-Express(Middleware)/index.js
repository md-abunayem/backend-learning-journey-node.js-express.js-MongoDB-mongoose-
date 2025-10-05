require('dotenv').config()
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
//In Express.js, a middleware is a function that has access to the request (req), response (res), and the next middleware function in the request-response cycle.

/*
✅ What Can Middleware Do?
Middleware can:
✅ Execute any code
✅ Modify the req and res objects
✅ End the request-response cycle
✅ Call the next() function to pass control to the next middleware
*/

const myMiddleware = (req, res, next)=>{
    console.log("myMiddleware is excecuted....!!");

    //req.currentTime is added as a new key (property) to the req object.
    req.currenctTime = new Date(Date.now()) //Modify the req and res objects
    next()    // passes control to the next middleware/route handler
}

app.use(myMiddleware);    //Every request (GET, POST, etc.) to any route (e.g., /, /products, /users/1) will go through myMiddleware first, before hitting the route handler.


app.get('/', myMiddleware ,(req, res) => {
    console.log("This is home route excecuted...")
    res.send(`<h1>This Home Page(Route) loaded at: ${req.currenctTime}</h1>`);  //despaly modified the req  object's a portion
});

app.get('/about' ,(req, res) => {
    console.log("This is about route excecuted...")
    res.send(`<h1>This about Page(Route) loaded at: ${req.currenctTime}</h1>`);  
});


app.use((req, res, next)=>{
    res.send("<h1>404 Page Not Found..</h1>")
})
//Use this when none of your routes match the request URL. This should be placed after all your route handlers.


app.listen(PORT ,() => {
    console.log(`Server is running at port: http://localhost:${PORT}`);
});




/*
2. Error-Handling Middleware (for unexpected errors)
Use this to catch errors that happen inside route handlers or other middleware, typically when you call next(err).

app.use((err, req, res, next) => {
  console.error(err.stack);          // Log error details for debugging
  res.status(500).send("Something went wrong!"); // Send a generic error response
});
*/