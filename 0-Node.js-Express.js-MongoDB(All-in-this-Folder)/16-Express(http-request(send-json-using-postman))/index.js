const express = require('express')

const PORT = 3000;
const app = express()

//middleware 
app.use(express.json())

app.post('/', (req, res)=>{
    console.log(req.body);

    const {id, name} = req.body;  //destructure
    res.send(`<h1>Your Id: ${id} and name: ${name}</h1>`)   //output at postman
})


app.listen(PORT, ()=>{
    console.log(`Server is runnig at port: http://localhost:${PORT}`)
})