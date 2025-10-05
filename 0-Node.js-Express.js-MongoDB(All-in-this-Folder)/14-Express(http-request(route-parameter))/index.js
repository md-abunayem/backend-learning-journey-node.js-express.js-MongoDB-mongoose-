const express = require('express')

const PORT = 3000;
const app = express()

//http://localhost:3000/userId/100
//http://localhost:3000/userId/100/userName/Nayem
app.get('/userId/:id/userName/:name', (req, res)=>{
    console.log(`Route parameter: `, req.params);
    
    // const id = req.params.id;
    // const name = req.params.name;

    const {id, name} = req.params;   //req.params is an object that holds the values from the route:
    res.send(`<h1>Your Id is: ${id} and Name:${name}</h1>`)
})


app.listen(PORT, ()=>{
    console.log(`Server is runnig at port: http://localhost:${PORT}`)
})