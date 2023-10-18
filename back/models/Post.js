const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    idName: {
        type: String,
        required: true,
    },

    text: String,
    retweets: {
        type: Number,
        default: 0
    },

    signet: {
        type: Number,
        default: 0
    },

    likes: {
        type: number, 
        default: 0
    },

    comments: {
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }], // Définit le type comme un tableau d'ObjectId
        default: [], 
    },
    imagesOrVideos: {
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }], // Définit le type comme un tableau d'ObjectId
        default: [], 
    },
    responseTo:{
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }], // Définit le type comme un tableau d'ObjectId
        default: [], 
    }
})