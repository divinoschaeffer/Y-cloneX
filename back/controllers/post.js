const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

async function createPost(req, res){
    const currentUser = req.user.user;
    const idName = currentUser.idName;
    const post = new Post({
        idName: req.body.idName,
        username: req.body.username,
        text: req.body.text,
        creationDate: new Date()
    });

        post.save()
        .then((post) => {
                const update = {$push: {posts: post._id}};
                User.findOneAndUpdate({idName}, update, {new: true})
                .then((user) => res.status(200).json(user));
        })
        .catch((err) => {
                console.log(error);
                res.status(500).json("Echec lors de la mis à jour de l'utilisateur");
        })

}

module.exports = createPost;