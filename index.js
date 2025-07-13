// // Using Node.js `require()`
// const mongoose = require('mongoose');

// // Using ES6 imports
// import mongoose from 'mongoose';



const express = require('express');
//importing from db.js
const { UserModel, TodoModel } = require('./db');


const jwt = require ("jsonwebtoken")
const JWT_SECRET = "helloookhushiii";

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {

    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email

    await UserModel.insert({
        name: name,
        password: password,
        email: email
    })
    res.json({
        message: "you are logged innn"
    })
});

app.post("/signin", async function (req, res) {
   const email = req.body.email;
    const password = req.body.password;


    // the await keyword is used to pause the execution of an async function until a Promise settles (either fulfills or rejects).
    const user = await UserModel.findOne({
        email : email,
        password : password
    })

console.log(user);

 if (user) {
    const token = jwt.sign({
        id : user._id 
    } );
    res.json ({
        token : token
    })
 } else {
    res.status(403).json({
        message : "Incorrect credentials"
    })
 }

});

app.post("/todo", function (req, res) {

});
app.get("/todos", function (req, res) {

});


app.listen(3000);