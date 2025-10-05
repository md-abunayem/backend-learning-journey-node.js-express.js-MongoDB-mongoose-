const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next)=>{
  console.log(req.url, req.method);
  res.send(`
    <h1>Register your home here</h1>
    <form action="/host/add-home" method="POST">
      <input type="text" name='houseName' placeholder="Enter house name" required>
      <input type="submit">
    </form>
    `)
})

hostRouter.post("/add-home", (req, res, next)=>{
  console.log(req.url, req.method);
  const houseName = req.body.houseName;                    // Read form data from request body

  res.send(`
    <h1>Register completed successfully</h1>
    <p>House Name: ${houseName}</p>    
    <a href="/">Go to Home</a>
    `)
})

module.exports = hostRouter;
