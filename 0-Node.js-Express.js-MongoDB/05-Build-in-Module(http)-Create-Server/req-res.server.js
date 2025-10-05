const http = require('http')

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method)

    // res.writeHead(202, {'Content-Type' : 'text/plain'})
    // res.write('Hello World')

    res.writeHead(202, {'Content-Type' : 'text/html'})
    res.write('<h1>Hello World</h1>\n')

    res.end("\nResponse ended")
})

const PORT = 3000;

server.listen(PORT, ()=>{
    console.log(`Server is runnig on port: http://localhost:${PORT}`)
})