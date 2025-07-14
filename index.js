

// import bcrypt library 
const bcrypt = require ("bcrypt");

// import zod
const {z} = require ("zod");


const express = require('express');
//importing from db.js
const { UserModel, TodoModel } = require('./db');


const jwt = require("jsonwebtoken")
const JWT_SECRET = "helloookhushiii";


const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://khushikumari2392006:G86zWjslJQf4Thn4@cluster0.lytq49z.mongodb.net/todo-khushiii-22222")

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {

// Error handling , Approach #1 - Try catch ... manage errors gracefully rather than crashing the application or causing unexpected behavior.

   try {


    // Define the schema in the zod object 
    const requireBody = z.object({
        email: z.string(),
        name : z.string(),
        password : z.string()
    }) 

// Step2 Parsing the DATA 
    // const parsedData = requireBody.parse(req.body);
    const parsedDataWithSuccess = requireBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.json({
            message : "Incorrect format",
            //shows the exact error 
            error : parsedDataWithSuccess.error
        })
        return
    }

    //  Step1   // req.body objects should be string  
        // Input validation 
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email

// Hashed password , 5 is how many times to hash
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);

    await UserModel.create({
        name: name,
        // now let's store the hashed password here 
        password: hashedPassword,
        // password: password,
        email: email
    })
    res.json({
        message: "you are logged innn"
    })


}catch(e) {
    res.status(500).json({
        message : "error while signing up "
    })
}

});

app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;


    // the await keyword is used to pause the execution of an async function until a Promise settles (either fulfills or rejects).
    const user = await UserModel.findOne({
        email: email,
        password: password
    })

    console.log(user);

    if (user) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }

});

app.post("/todo", auth, function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    TodoModel.create({
        title,
        userId,
        done
    });
    res.json({
        message: "todo created",
        userId: userId
    })
});
app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId: userId
    })
    res.json({
        todos
    })

});

// auth middleware which takes 3 things as a input req , res , next ....
function auth(req, res, next) {
    const token = req.headers.token;

    const decodeData = jwt.verify(token, JWT_SECRET);

    if (decodeData) {
        req.userId = decodeData.Id;
        next();
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials "
        })
    }
}



app.listen(3000);