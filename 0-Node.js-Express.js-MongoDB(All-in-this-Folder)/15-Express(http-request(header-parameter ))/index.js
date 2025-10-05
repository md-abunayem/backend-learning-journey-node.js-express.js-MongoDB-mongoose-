const express = require('express')

const PORT = 3000;
const app = express()

app.get('/', (req, res)=>{
    console.log(req.headers)

    const {id, name} = req.headers;   //use postman to send header
    res.send(`<h1>Id:${id} and Name: ${name}</h1>`)  //you can see the output at postman
})


app.listen(PORT, ()=>{
    console.log(`Server is runnig at port: http://localhost:${PORT}`)
})



// output of req.headers:
// {
//   id: '122',
//   name: 'Nayem',
//   'user-agent': 'PostmanRuntime/7.44.1',
//   accept: '*/*',
//   'postman-token': '9c26b1f4-b7db-4f9a-ae44-74eff5d6850b',
//   host: 'localhost:3000',
//   'accept-encoding': 'gzip, deflate, br',
//   connection: 'keep-alive'
// }

