require('dotenv').config()
const express = require('express');

const path = require('path')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/views' + '/index.html')
});



app.use((req, res, next)=>{
    res.send("<h1>404 Page Not Found..</h1>")
})


app.listen(PORT ,() => {
    console.log(`Server is running at port: http://localhost:${PORT}`);
});
