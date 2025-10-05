const http = require("http");

/*
function requestListner(req, res){
    console.log(req)
}
const server = http.createServer(requestListner)//it is take a callback function as parameter

server.listen(3001); //Now, write http://localhost:3000/ at search bar on browser
*/

//updated(modern) way

const PORT = 3001;

const server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(PORT, () => {
  console.log(`Server runnig on address: http://localhost:${PORT}`);
});
