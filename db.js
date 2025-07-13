// Initialize the schema of your app in a new file (db.js)
// Using Node.js `require()`
const { Password } = require('clarifai-nodejs-grpc/proto/clarifai/api/resources_pb');
const { description } = require('clarifai-nodejs-grpc/proto/clarifai/api/utils/extensions_pb');
const mongoose = require('mongoose');

// Using ES6 imports
// import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
// schema is a class here Take schema as a structure....

const User = new Schema ({
    name : String,
    Password : String,
    username : String
});

const Todo = new Schema({
    description : String,
     name : String,
    userid : ObjectId,
    done : Boolean

});

const UserModel = mongoose.model ('users', User) ;
const TodoModel = mongoose.model('todos', Todo);