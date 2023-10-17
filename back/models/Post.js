const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    idName: String,
    text: String,
    retweets: Number,
    signet: Number,
    likes: Number,
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }],
    imagesOrVideos: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Image'
    }],
    responseTo:{
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }
})