const { sumRequestHandler } = require("./sumHandler");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);

  res.setHeader("Content-Type", "text/html");

  if (req.url === "/") {
    res.write(`
            <html lang="en">
                <head>
                    
                    <title>Calculator</title>
                </head>
                <body>
                    <nav>
                        <a href="/calculator">Calculator</a>
                    </nav>
                    <h1>Welcome to Home Page of Calculator</h1>
                </body>
            </html>
            
        `);
    res.end();
    return;
  } else if (req.url === "/calculator") {
    res.write(`          
            <html lang="en">
                <head>

                    <title>Calculator</title>
                </head>

                <body>
                    <h2>Calculete Here....</h2>
                    <form action="/calculate-result" method="POST">
                        <label for="number1">First: </label>
                        <input type="number" name="number1" id="number1" placeholder="Enter first number"><br><br>
                        <label for="number2">Second: </label>
                        <input type="number" name="number2" id="number2" placeholder="Enter second number"><br><br>
                        <button type="submit">Sum</button>
                    </form>
                </body>
            </html>
        `);
    res.end();
    return;
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method === "POST"
  ) {
    return sumRequestHandler(req, res);
  } else {
    res.write(`
            <html lang="en">
                <head>
                    
                    <title>Calculator</title>
                </head>
                <body>
                    <h1>404 Page does not exist</h1>
                    <a href="/">Go to Home</a>
                </body>
            </html>
            
        `);
    res.end();
    return;
  } 
};

exports.requestHandler = requestHandler; //another way to export
