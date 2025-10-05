const express = require('express')

const PORT = 3000;
const app = express()


/*Query parameters are key-value pairs appended to a URL after a question mark ?. They are used to pass data from the client (like a browser or Postman) to the server.*/

//http://localhost:3000/?id=100
//http://localhost:3000/?id=100&name=Nayem
app.get('/', (req, res)=>{
    console.log(`query parameter: `, req.query)

    // const id = req.query.id
    // const name = req.query.name
    const {id, name} = req.query;   //destructuring (req.query is an object automatically provided by Express that contains all query parameters:)
    res.send(`<h1>Your Id is: ${id} and Name is : ${name}</h1>`)   //Only the first res.send() will be executed. The rest will be ignored, because once you send a response, the connection is closed.
})


app.listen(PORT, ()=>{
    console.log(`Server is runnig at port: http://localhost:${PORT}`)
})