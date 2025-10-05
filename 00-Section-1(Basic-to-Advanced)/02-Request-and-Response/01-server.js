const http = require('http');

const PORT = 3001

const server = http.createServer((req, res)=>{
    // console.log(res);
    // process.exit();    //Immediately exits the process using process.exit() after log(print)

    console.log(req.url, req.method, req.headers)    //understand request obj


    //send res to client(browser)
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Send response</title></head>')
    res.write('<h1>This a simple response</h1>')
    res.write('</head>');
    res.end()     // Without it, the browser will keep loading forever, because it’s waiting for the server to say "I’m done sending data."
})


server.listen(PORT, ()=>{
    console.log(`Server is running at: http://localhost:${PORT}`)
})