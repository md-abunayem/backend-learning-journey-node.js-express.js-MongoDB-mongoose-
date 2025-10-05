const express = require('express');
const router = express.Router();
const passport = require("passport");


const {registerUser} = require('../controllers/user.controller');

//register : get
router.get('/register', (req, res)=>{
    res.render('register.ejs')
})

//register : post 
router.post('/register', registerUser)

//for login
const checkLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/profile")
    }
    next();
}

//login : get
router.get('/login', checkLoggedIn ,(req, res)=>{
    res.render('login.ejs')
})

//login : post
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}));


// Middleware to protect routes
//check authenticaion for profile
const checkAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
} 
//profile protected route
router.get('/profile', checkAuthenticated, (req, res)=>{
    res.render('profile.ejs')
})

//logout : get
router.get('/logout', (req, res)=>{
    try {
        req.logout((err)=>{
            if(err){
                return next(err)
            }
        })
        res.redirect("/")
    } catch (error) {
        res.status(500).send(error.message)
    }})

module.exports = router;
