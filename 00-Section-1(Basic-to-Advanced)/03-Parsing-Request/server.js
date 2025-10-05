const http = require("http");
const fs = require("fs");

const PORT = 3001;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

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
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString(); // convert buffer chunk to string and append to body
      console.log(fullBody); // Example: "username=Nayem&gender=male"

      //parse the body data
      const params = new URLSearchParams(fullBody);
      console.log(params); //URLSearchParams { 'username' => 'Abu Nayem', 'gender' => 'male' }

      //   const bodyObj ={}
      //   for(let [key, value] of params.entries()){
      //     bodyObj[key] = value;
      //   }
      //   console.log(bodyObj);     //{ username: 'Abu Nayem', gender: 'male' }

      const bodyObj = Object.fromEntries(params);
      console.log(bodyObj);

      fs.writeFile("user.txt", JSON.stringify(bodyObj), (error) => {
        if (error) {
          console.log("Error occured ", error);
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          console.log("Successfully complete ....");
          console.log("Successfully written to file.");
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        }
      });
    });
    
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
