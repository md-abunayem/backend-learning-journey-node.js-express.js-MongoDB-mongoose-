const express = require('express')

const PORT = 3000;
const app = express()

app.get('/products/:id([0-9]+)', (req, res) => {
    const id = req.params.id;
    const name = req.query.name || "Unknown";

    res.send(`<h1>Your Id is: ${id} and Name: ${name}</h1>`)
})

app.get('/products/:title([a-zA-Z0-9]+)', (req, res) => {
    const id = req.params.id;
    const name = req.query.name;

    res.send(`<h1>Your Id is: ${id} and Name: ${name}</h1>`)
})

app.use('*', (req, res) => {
    res.status(404).send('<h1>404 Page Not Found</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running at port: http://localhost:${PORT}`)
})
