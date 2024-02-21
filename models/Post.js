const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    idName: {
        type: String,
        required: true,
    },

    username:{
        type: String,
        required: true
    },

    text: String,

    creationDate: Date,

    retweets: {
        type: Number,
        default: 0
    },

    signets: {
        type: Number,
        default: 0
    },

    likes: {
        type: Number, 
        default: 0
    },

    comments: {
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }], // Définit le type comme un tableau d'ObjectId
        default: [], 
    },
    image: {
        type: [String],
        default: [], 
    },
    responseTo:{
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
        default: []
    },
    retweetOf:{
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }], // Définit le type comme un tableau d'ObjectId
        default: []
    }
})


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;