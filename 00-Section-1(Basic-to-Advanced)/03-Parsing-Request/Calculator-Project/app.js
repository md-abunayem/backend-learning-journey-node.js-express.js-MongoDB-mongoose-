const http = require('http');

const {requestHandler} = require('./requestHandler');

PORT = 3000;

const server = http.createServer(requestHandler);

server.listen(PORT, ()=>{
    console.log(`Server is runnig at: http://localhost:${PORT}`)
})