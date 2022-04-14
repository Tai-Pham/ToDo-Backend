const mongoose = require('mongoose');
//Schema
const noteSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    important: {
        type: Boolean,
        default: false
    }
});

noteSchema.index( {"userID": 1, "title": 1}, {unique: true} )

//model
const noteModel = mongoose.model('note', noteSchema, 'notes');

//export
module.exports = noteModel;