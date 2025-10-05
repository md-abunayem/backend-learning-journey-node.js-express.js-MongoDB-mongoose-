const app = require('./app.js')

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Sever is running at port: http://localhost:${PORT}`)
})