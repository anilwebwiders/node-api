const express = require("express");
const route = express.Router();
const UserController = require('../controllers/users')

const commonAuth = require("../controllers/middleware");

route.get('/',(req,res) => {
    res.send('This is home page')
})

route.post('/api/signin',commonAuth, UserController.signin)


route.post('/api/signup',commonAuth,UserController.signup)


route.get('/about',(req,res) => {

    
    res.send('This is about pages');
})

route.get('/api/*',(req,res)=>{
    res.status(404).json({
        status:0,
        message:"API not found"
    })
});

route.get('/*',(req,res)=>{
    res.status(404).send('404-page')
});

module.exports = route;