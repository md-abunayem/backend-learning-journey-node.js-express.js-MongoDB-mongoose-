const express = require('express')
const multer  = require('multer')

const PORT = 3000;

const app = express()

//middleware 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploaded/')
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name)
  }
})

const upload = multer({ storage: storage })


app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post('/',upload.single('file') ,(req, res)=>{
    res.send("File uploaded successfully")
})

app.listen(PORT, (req, res)=>{
    console.log(`Server is runnig at port: http://localhost:${PORT}`)
})