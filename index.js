// // Using Node.js `require()`
// const mongoose = require('mongoose');

// // Using ES6 imports
// import mongoose from 'mongoose';

const express = require('express');
//importing from db.js
const { UserModel, TodoModel } = require('./db');


const jwt = require ("jsonwebtoken")
const JWT_SECRET = "helloookhushiii";


const mongoose = require("mongoose");
mongoose.connect ("mongodb+srv://khushikumari2392006:G86zWjslJQf4Thn4@cluster0.lytq49z.mongodb.net/todo-khushiii-22222")

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {

    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email

    await UserModel.create({
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
        id : user._id.toString()
    } , JWT_SECRET);
    res.json ({
        token : token
    })
 } else {
    res.status(403).json({
        message : "Incorrect credentials"
    })
 }

});

app.post("/todo", auth ,  function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    TodoModel.create ({
        title,
        userId,
        done
    });
    res.json({
        message : "todo created",
        userId: userId
    })
});
app.get("/todos", auth , async function (req, res) {
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId : userId
    })
    res.json({
        todos
    })

});

// auth middleware which takes 3 things as a input req , res , next ....
function auth (req, res, next) {
     const token = req.headers.token;

     const decodeData = jwt.verify(token, JWT_SECRET) ;

     if (decodeData) {
        req.userId = decodeData.Id;
        next();
     }
     else {
        res.status(403).json ({
            message : "Incorrect credentials "
        })
     }
}



app.listen(3000);