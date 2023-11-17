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

    bio: {
        type: String
    },

    birthDate: {
        type: Date,
    },

    firstConnection: {
        type: Date,
    },

    profileImage: String,
    landingImage: String,

    public: {
        type: Boolean,
        required: true
    },

    followRequest:{
        type: [String],
        default: []
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
    role: {
        type: Number,
        required: true,
        default: 0
    },

    conversation: [String], //TODO: changer ça
});

const User = mongoose.model('User',UserSchema);

module.exports = User;