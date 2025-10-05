const http = require("http");

const PORT = 3001;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method); // req.body can show here

  res.setHeader("Content-Type", "text/html");

  if (req.url === "/home") {
    res.write(`
      <html>
        <head><title>Home</title></head>
        <body>
          <nav>
              <ul>
                  <li><a href="/home">Home</a></li>
                  <li><a href="/men">Men</a></li>
                  <li><a href="/women">Women</a></li>
                  <li><a href="/kids">Kids</a></li>
                  <li><a href="/cart">Cart</a></li>
              </ul>
          </nav>
          <h1>Welcome to Home</h1>
        </body>
      </html>
    `);
    res.end();
    return;
  }

  if (req.url === "/men") {
    res.write(`
      <html>
        <head><title>Men</title></head>
        <body>
          <h1>Welcome to Men Page</h1>
        </body>
      </html>
    `);
    res.end();
    return;
  }

  if (req.url === "/women") {
    res.write(`
      <html>
        <head><title>Women</title></head>
        <body>
          <h1>Welcome to Women Page</h1>
        </body>
      </html>
    `);
    res.end();
    return;
  }

  if (req.url === "/kids") {
    res.write(`
      <html>
        <head><title>Kids</title></head>
        <body>
          <h1>Welcome to Kids Page</h1>
        </body>
      </html>
    `);
    res.end();
    return;
  }

  if (req.url === "/cart") {
    res.write(`
      <html>
        <head><title>Cart</title></head>
        <body>
          <h1>Welcome to Cart Page</h1>
        </body>
      </html>
    `);
    res.end();
    return;
  }

  // Default Page (404 or root)
  res.write(`
    <html>
      <head><title>Navigation</title></head>
      <body>
        <nav>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/men">Men</a></li>
                <li><a href="/women">Women</a></li>
                <li><a href="/kids">Kids</a></li>
                <li><a href="/cart">Cart</a></li>
            </ul>
        </nav>
        <h1>Navigate to different pages</h1>
      </body>
    </html>
  `);
  res.end();
});

server.listen(PORT, () => {
  console.log(`The server is running at: http://localhost:${PORT}`);
});
