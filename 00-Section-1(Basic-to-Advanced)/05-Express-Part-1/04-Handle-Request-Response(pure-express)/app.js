const express = require('express')   //// 1. Import express
const app = express()       // 2. Create an express app
const PORT = 3000;          // 3. Define a port

app.use(express.json())    // 4. Middleware to parse JSON body (optional but common)
app.use(express.urlencoded({ extended: true })); // for forms


//5. Handle GET request
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <input type="text" name="name" placeholder="Enter your name" />
      <button type="submit">Submit</button>
    </form>
  `);
});


//6. Handle POST request
// Handle form POST submission
app.post('/submit', (req, res) => {
  const userName = req.body.name;
  res.send(`<h1>Hello, ${userName}!</h1>`);
});


// 7. Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})