//import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser')

//route
const noteRoutes = require('./route/noteRoutes');
const userRoutes = require('./route/userRoutes');

//Set app to use the following module
const app = express();
// option = {
//     origin: "http://localhost:4200",
//     credential: true
// }
// app.use(cors());

app.use((req, res, next)=>{
    // this server is still accessable to all 
    //res.setHeader('Access-Control-Allow-origin','*')
    // specify to whom this should be available
    res.setHeader('Access-Control-Allow-origin','http://localhost:4200')
    res.setHeader('Access-Control-Allow-Headers','Content-type','Application/JSON')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, PATCH");
    next()
})

app.use(express.json());
app.use(cookieParser());



mongoose.connect("mongodb://127.0.0.1:27017/diary", () => {
    console.log("Mongoose successfully connected to MongoDB");
})

app.use(userRoutes)
app.use(noteRoutes)

app.listen(3000, () => {
    console.log("Node server is listening on port 3000");
})