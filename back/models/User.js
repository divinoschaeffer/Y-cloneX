const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    idName: String,
    birthdate: Date,
    firstConnection: Date,
    profileImage: String,
    landingImage: String,

    followers:[String],
    follows:[String],

    posts:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }],

    likes:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }],

    comments:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }]
});

const User = mongoose.model('User',UserSchema);

module.exports = User;