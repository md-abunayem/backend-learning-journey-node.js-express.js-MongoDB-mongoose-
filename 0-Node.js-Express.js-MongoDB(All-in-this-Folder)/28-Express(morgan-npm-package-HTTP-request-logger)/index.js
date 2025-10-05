
const express = require('express');
const morgan = require('morgan')
const app = express();

// Use Morgan to log requests in 'dev' format (concise, colored)
app.use(morgan('dev'));   //output shows on console

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});

app.get('/products', (req, res) => {
  res.send('<h1>Product page</h1>');
});
app.post('/products', (req, res) => {
  res.send('<h1>Product page post req</h1>');
});

// Start the server
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
