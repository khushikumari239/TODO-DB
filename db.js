// Initialize the schema of your app in a new file (db.js)
// Using Node.js `require()`

const mongoose = require('mongoose');

// Using ES6 imports
// import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
// schema is a class here Take schema as a structure....

const User = new Schema ({
    name : String,
    password : String,
    email : {type : String, unique : true}
});

const Todo = new Schema({
    description : String,
    userid : ObjectId,
    done : Boolean

});

const UserModel = mongoose.model ('users', User) ;
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel : UserModel,
    TodoModel : TodoModel
}