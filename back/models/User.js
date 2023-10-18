const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    idName: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    birthdate: {
        type: Date,
        required: true,
    },

    firstConnection: {
        type: Date,
        required: true
    },

    profileImage: String,
    landingImage: String,

    public: {
        type: Boolean,
        required: true
    },

    followers:{
        type: [String],
        default: []
    },

    follows:{
        type: [String],
        default: []
    },

    posts: {
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }], // Définit le type comme un tableau d'ObjectId
        default: [], 
    },
        
    likes: {
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }], // Définit le type comme un tableau d'ObjectId
        default: [], 
    },

    comments:{
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }], // Définit le type comme un tableau d'ObjectId
        default: [], 
    },

    signets:{
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }], // Définit le type comme un tableau d'ObjectId
        default: [], 
    },

    conversation: [String],
});

const User = mongoose.model('User',UserSchema);

module.exports = User;