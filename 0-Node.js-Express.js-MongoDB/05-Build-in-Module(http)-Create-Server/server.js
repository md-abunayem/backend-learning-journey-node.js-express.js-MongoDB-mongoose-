const http = require('http')

/*
http.createServer((req, res)=>{
    console.log(req.url)
    res.write('<h1>Hello World</h1>')           //Write data to the HTTP response sent to a client (browser, API client)...unlike fs.write()
    res.end("Hello, I am your server.");
}).listen(3000)
*/

const server = http.createServer((req, res)=>{
    console.log(req);
    res.end("Hello, I am your server.")
})

const PORT = 3000;

server.listen(PORT, ()=>{
    console.log(`Server is runnig on port: http://localhost:${PORT}`)
})