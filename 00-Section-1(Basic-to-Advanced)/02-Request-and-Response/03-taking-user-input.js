const http = require("http");
const fs = require("fs");

const PORT = 3001;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  //send res to client(browser)based on different routes
  res.setHeader("Content-Type", "text/html");

  if (req.url === "/" || req.url === "/home") {
    res.write("<html>");
    res.write("<head><title>Home</title></head>");
    res.write("<body><h1>This is Home Page</h1>");
    res.write("<h3>Enter your details:</h3>");
    res.write("<form action='/submit-details' method='POST'>");
    res.write(
      "<input type='text' name='username' placeholder='Enter your username'> <br>"
    );
    res.write("<label for='male'></label>");
    res.write(
      "<input type='radio' id='male' name='gender' value='male'>Male<br>"
    );
    res.write("<label for='female'></label>");
    res.write(
      "<input type='radio' id='female' name='gender' value='female'>female<br>"
    );
    res.write("<input type='submit' value='submit'>");
    res.write("</form>");
    res.write("</body></html>");
    res.end();
    return;
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method === "POST"
  ) {
    // fs.writeFileSync('user.txt', 'Nayem');        //blocking all the execution--->> not appropriate
    fs.writeFile("user.txt", "Nayem", (error) => {
      if (error) {
        console.log("Error writing file:", error);
      } else {
        console.log("File written successfully!");
      }
    }); //This asynchronous--->>> not block all the execution of all others code
    res.statusCode = 302;
    res.setHeader("Location", "/"); //after creating the txt file then redirect to the home page
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
