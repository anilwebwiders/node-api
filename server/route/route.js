const express = require("express");
const res = require("express/lib/response");
const route = express.Router();
const UserController = require('../controllers/users')

route.get('/',(req,res) => {
    res.send('This is home page')
})

route.get('/api/signin',UserController.signin)


route.post('/api/signup',UserController.signup)


route.get('/about',(req,res) => {
    res.send('This is about pages');
})

route.get('/*',(req,res)=>{
    res.status(404).send('404-page')
});

module.exports = route;