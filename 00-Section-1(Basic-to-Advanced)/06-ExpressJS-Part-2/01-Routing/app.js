const express = require('express')
const app = express();
const PORT = 3000;

// ✅ Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next)=>{
  console.log(req.url, req.method);
  res.send(`
    <h1>Welcome to air
    bnb</h1>
    <a href="/add-home">Add Home</a>
    `)
})

app.get("/add-home", (req, res, next)=>{
  console.log(req.url, req.method);
  res.send(`
    <h1>Register your home here</h1>
    <form action="/add-home" method="POST">
      <input type="text" name='houseName' placeholder="Enter house name">
      <input type="submit">
    </form>
    `)
})

app.post("/add-home", (req, res, next)=>{
  console.log(req.url, req.method);
  res.send(`
    <h1>Register completed successfully</h1>
    <a href="/">Go to Home</a>
    `)
})

app.listen(PORT, ()=>{
  console.log(`Server is runnig at http://localhost:${PORT}`)
})