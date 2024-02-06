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

    profileImage: String,

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

    //TODO: mettre en place les citations (faire attention à si user est en public ou non)

    comments: {
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }], // Définit le type comme un tableau d'ObjectId
        default: [], 
    },
    imagesOrVideos: {
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Image' }], // Définit le type comme un tableau d'ObjectId
        default: [], 
    },
    responseTo:{
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }], // Définit le type comme un tableau d'ObjectId
        default: null,
    }
})


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;