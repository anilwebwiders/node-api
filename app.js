const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const connectDB = require('./server/database/connection');
dotenv.config({
    path:"config.env"
})
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

//mongo db connection
connectDB();
app.use(bodyParser.urlencoded({extended:true})); //read x www url encoded data 
app.use(express.json()); //read row data    

const ROUTE_PATH = path.join(__dirname,'server/route/route')

app.use('/',require(ROUTE_PATH))

app.listen(PORT,() =>{
    console.log(`server listening ${PORT}`)
})