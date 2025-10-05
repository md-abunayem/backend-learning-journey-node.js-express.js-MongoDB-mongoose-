require('dotenv').config();
const express = require('express')
const multer  = require('multer')
const mongoose = require('mongoose');

const Users = require('./users.model.js')

const PORT = process.env.PORT || 8000;
const DB_NAME = "uploadfiles"

const app = express()

//middleware 
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//connect database
const connectDB = async() =>{
  try {
  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log("✅ Connected to MongoDB")
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

connectDB();   //connect database

//code of multer middleware
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

app.post('/',upload.single('file') ,async (req, res)=>{
  try {
    const newUser = new Users({
      name: req.body.name,
      email: req.body.email,
      file: req.file.filename
    })
    await newUser.save()
    res.status(200).json({
      newUser
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.listen(PORT, (req, res)=>{
    console.log(`Server is runnig at port: http://localhost:${PORT}`)
})