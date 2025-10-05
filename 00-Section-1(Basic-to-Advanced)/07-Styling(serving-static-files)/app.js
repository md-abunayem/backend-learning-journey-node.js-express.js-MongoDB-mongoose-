//core module
const path = require('path');

//external module
const express = require('express')
const app = express();
const PORT = 3000;

//local module
const userRoutes = require('./routes/userRouter')
const hostRoutes = require('./routes/hostRouter')
const rootDir = require('./util/pathUtil');

app.use(express.urlencoded({ extended: true }));

app.use("/",userRoutes)       
app.use("/host", hostRoutes)

app.use(express.static(path.join(rootDir, 'public')))
/**express.static() is Designed to Serve Directories, Not Files
Purpose: It automatically serves all files inside a folder (e.g., public/).*/ 

//error handler
app.use((req, res, next)=>{
  // console.log(err.stack);
  res.status(500).sendFile(path.join(dirname,'views', 'successfulMsg.html'))
})

app.listen(PORT, ()=>{
  console.log(`Server is runnig at http://localhost:${PORT}`)
})