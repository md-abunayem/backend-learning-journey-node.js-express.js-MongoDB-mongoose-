const http = require("http");
const fs = require("fs");

const PORT = 3000;
const hostName = "127.0.0.1";

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  /*if (req.url === "/") {
    fs.readFile("./views/index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data); // end response with HTML content
      }
    });
  } else if (req.url === "/about") {
    fs.readFile("./views/about.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data); // end response with HTML content
      }
    });
  } else if (req.url === "/contact") {
    fs.readFile("./views/contact.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data); // end response with HTML content
      }
    });
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Server url is not valid");
  }*/

  if (req.url === "/") {
    serveFile("./views/index.html", res);
  } else if (req.url === "/about") {
    serveFile("./views/about.html", res);
  } else if (req.url === "/contact") {
    serveFile("./views/contact.html", res);
  }else{
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("404 Page Not Found");
  }
});

//The previous code is repetative -> we can use function

const serveFile = (filePath, res)=>{
    fs.readFile(filePath,"utf-8", (err,data)=>{
        if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end("Internal Server Error")
        }else{
            res.writeHead(200, {'Content-Type':'text.html'});
            res.write(data);
            res.end()
        }
    })
}


server.listen(PORT, () => {
  console.log(`Server is runnig  at the port: http://${hostName}:${PORT}`);
});
