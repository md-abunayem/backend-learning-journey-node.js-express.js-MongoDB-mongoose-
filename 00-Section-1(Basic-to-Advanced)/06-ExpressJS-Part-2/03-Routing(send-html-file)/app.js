//core module
const path = require('path');

//external module
const express = require('express')
const app = express();
const PORT = 3000;

//local module
const userRoutes = require('./routes/userRouter')
const hostRoutes = require('./routes/hostRouter')

app.use(express.urlencoded({ extended: true }));

app.use("/",userRoutes)       
app.use("/host", hostRoutes)

//error handler
app.use((req, res, next)=>{
  // console.log(err.stack);
  res.status(500).sendFile(path.join(__dirname,'views', 'successfulMsg.html'))
})

app.listen(PORT, ()=>{
  console.log(`Server is runnig at http://localhost:${PORT}`)
})