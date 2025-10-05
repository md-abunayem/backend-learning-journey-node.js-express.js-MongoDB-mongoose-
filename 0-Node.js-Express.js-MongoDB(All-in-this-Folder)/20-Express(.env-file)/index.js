require('dotenv').config()
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    const id = req.params.id;
    res.send(`<h1>We are learning about dot env file </h1>`);
});

app.listen(PORT, () => {
    console.log(`Server is running at port: http://localhost:${PORT}`);
});
