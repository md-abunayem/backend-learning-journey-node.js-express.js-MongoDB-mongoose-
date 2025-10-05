require('dotenv').config()
const express = require('express')

const app = require('./app.js')
const usersRouter = require('./routes/users.route.js')
const productsRouter = require('./routes/products.route.js')

const PORT = process.env.PORT || 3001

//middleware
app.use(express.urlencoded({extended:true}))

//http://localhost:3000/users
app.use(usersRouter);
//http://localhost:3000/products
app.use(productsRouter)



app.listen(PORT, ()=>{
    console.log(`Server is runnig at port: http://localhost:${PORT}`)
} )