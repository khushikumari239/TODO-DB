// // Using Node.js `require()`
// const mongoose = require('mongoose');

// // Using ES6 imports
// import mongoose from 'mongoose';

const express = require('express');
const app = express();
app.use(express.json());


app.post ("/signup" , function(req, res)  {

});

app.post("/login",function (req , res){

});

app.post("/todo",function (req , res){

});
app.get("/todos",function (req , res){

});


app.listen (3000);