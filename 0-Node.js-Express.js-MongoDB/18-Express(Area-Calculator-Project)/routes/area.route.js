//core  module
const path = require('path')

const express = require('express')
const router = express.Router();


router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'../' ,"views",'index.html'))
})

router.get('/circle', (req, res)=>{
    res.sendFile(path.join(__dirname, '../' ,"views",'circle.html'))
})


router.get('/triangle',(req, res)=>{
    res.sendFile(path.join(__dirname, '../' ,"views",'triangle.html'))
} )

router.post('/circle', (req, res)=>{
    const radius = req.body.radius;
    const area = Math.PI * radius * radius;
    res.send(`<h1>Area of the circle is:${area.toFixed(3)} m</h1>`)
})

router.post('/triangle',(req, res)=>{
    const height = req.body.height;
    const base = req.body.base;
    const area = .5 * height * base;
    res.send(`<h1>Area of the triangle is:${area.toFixed(2)} m</h1>`)
} )

module.exports = router;