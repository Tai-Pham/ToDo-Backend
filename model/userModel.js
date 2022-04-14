const mongoose = require('mongoose');
//const noteSchema = mongoose.model('note').schema

//Schema
const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

//model
const userModel = mongoose.model('user', userSchema, 'users');

//export
module.exports = userModel;
