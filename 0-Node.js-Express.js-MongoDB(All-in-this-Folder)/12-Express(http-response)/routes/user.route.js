const express = require('express')
const router = express.Router();

router.get("/",(req, res)=>{
    res.send("<h1>This is get req at home route....</h1>")     
})

router.get("/register",(req, res)=>{
    res.send("<h1>This is get req at register route....</h1>")    
})

router.get("/login",(req, res)=>{
    res.send("<h1>This is get req at login route....</h1>")     //we do not need to use res.end() because of res.send() and res.json()automatically end the response
})

module.exports = router;