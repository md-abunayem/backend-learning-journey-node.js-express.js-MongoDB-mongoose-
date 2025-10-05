const app = require('./app.js')

const port = process.env.PORT || 8000;

app.listen(port,(req, res)=>{
    console.log(`Server is running at port: http://localhost:${port}`)
})