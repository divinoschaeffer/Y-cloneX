const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    idName: {
        type: String,
        unique: true
    },
    birthdate: Date,
    firstConnection: Date,
    profileImage: String,
    landingImage: String,
    public: Boolean,

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
        ref: 'Post'
    }],

    signets:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Post' 
    }],

    conversation: [String],
});

const User = mongoose.model('User',UserSchema);

module.exports = User;