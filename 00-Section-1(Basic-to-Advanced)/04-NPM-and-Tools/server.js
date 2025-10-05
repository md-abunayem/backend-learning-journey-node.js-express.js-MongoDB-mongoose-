const http = require('http');

const PORT = 3000;

const server = http.createServer((req,res)=>{
    console.log(req.url, req.method)
    res.end();
})

server.listen(PORT, ()=>{
    console.log(`Server running at: http://localhost:${PORT}`)
})