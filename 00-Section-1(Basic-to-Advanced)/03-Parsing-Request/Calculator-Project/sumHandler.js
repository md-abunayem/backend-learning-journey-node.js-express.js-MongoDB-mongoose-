const sumRequestHandler = (req, res) => {
  // console.log("In sum Request handler", req, res);
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);

    const result = Number(bodyObj.number1) + Number(bodyObj.number2);
    res.write(`       
            <html lang="en">
                <head>
                    <title>Calculator</title>
                </head>
                <body>
                    <h2>Result:${result}</h2>
                </body>
            </html>
        `);
    res.end();
    return;
  });
};

exports.sumRequestHandler = sumRequestHandler;
