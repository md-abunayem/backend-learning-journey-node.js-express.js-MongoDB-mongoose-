const http = require("http");

const PORT = 3001;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  //send res to client(browser)based on different routes
  res.setHeader("Content-Type", "text/html");

  if (req.url === "/" || req.url === "/home") {
    res.write("<html>");
    res.write("<head><title>Home</title></head>");
    res.write("<body><h1>This is Home Page</h1></body>");
    res.write("</html>");
    res.end();
    return;
  } else if (req.url === "/products") {
    res.write("<html>");
    res.write("<head><title>Products</title></head>");
    res.write("<body><h1>This is Products Page</h1></body>");
    res.write("</html>");
    res.end();
    return;
  } else {
    res.write("<html>");
    res.write("<head><title>Others</title></head>");
    res.write("<body><h1>This is Others Page</h1></body>");
    res.write("</html>");
    res.end();
    return;
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
