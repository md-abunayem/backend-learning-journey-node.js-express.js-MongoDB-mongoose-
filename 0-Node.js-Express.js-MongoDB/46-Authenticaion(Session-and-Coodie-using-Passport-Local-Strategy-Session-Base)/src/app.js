require('dotenv').config()
const express = require('express')
const ejs = require('ejs');
const cors = require('cors')
require('../config/database.js')

const userRouter = require('../routes/user.routes.js')

const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('../config/passport.js')

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');

//middlewares
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//express-session
app.set('trust proxy', 1) // trust first proxy
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({   
    mongoUrl : process.env.DB_URL,
    collectionName: "sessions"
  })   //from connect-mongo
//   cookie: { secure: true }
}))

//passport
app.use(passport.initialize())
app.use(passport.session())

//routes
app.get('/', (req, res)=>{
    res.render("index.ejs")
})

//users routes
app.use(userRouter)
module.exports = app;
