const http = require("http");

const requestHandler = require('./user');

const PORT = 3001;

const server = http.createServer(requestHandler);
server.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});