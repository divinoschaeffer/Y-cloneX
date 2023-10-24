const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

async function createPost(req, res){
    const currentUser = req.user.user;
    const post = new Post(req.body);
    post.save()
        .then((savedPost) => {
            // const user = User.find(currentUser.idName);
            // const update = {savedPost._id, ...user.posts}
            // User.findOneAndUpdate(currentUser.idName, update, {new: true})
            //     .then(() => res.status(201).json(savedPost));
            // TODO: Mettre à jour tout ça
            res.status(201).json(savedPost);
        })
        .catch((err) => console.log(err))
}

module.exports = createPost;