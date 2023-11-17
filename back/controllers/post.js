const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');

async function createPost(req, res){
    const currentUser = req.user.user;
    const idName = currentUser.idName;
    const idPostResponseTo = req.body.responseTo;
    const post = new Post({
        idName: req.body.idName,
        username: req.body.username,
        text: req.body.text,
        creationDate: new Date()
    });

    if(idPostResponseTo !== undefined)
        post.responseTo = new mongoose.Types.ObjectId(idPostResponseTo);

        post.save()
        .then((post) => {
                const update = {$push: {posts: post._id}};
                if(idPostResponseTo !== undefined){
                    Post.findByIdAndUpdate(idPostResponseTo, {$push :{comments: new mongoose.Types.ObjectId(idPostResponseTo)}})
                    .then(() => {
                        User.findOneAndUpdate({idName}, update, {new: true})
                        .then((user) => res.status(200).json(user));
                    })
                }
                else
                User.findOneAndUpdate({idName}, update, {new: true})
                .then((user) => res.status(200).json(user));
        })
        .catch((err) => {
                console.log(error);
                res.status(500).json("Echec lors de la mis à jour de l'utilisateur");
        })

}

async function deletePost(req, res){
        const currentUser = req.user.user;
        const id = new mongoose.Types.ObjectId(req.params.id);
        const idName = currentUser.idName;

        User.findOne({idName})
        .then((user) => {
                if(user.posts.includes(id)){
                        Post.findByIdAndDelete(id)
                        .then(() => {
                                User.findByIdAndUpdate(user._id,{$pull: {posts: id}},{new: true})
                                .then((userUpdated) => {
                                        res.status(200).json(userUpdated);
                                })
                        })
                        
                }
                else
                        res.status(200).json(user);
        })
        .catch((err) => {
                console.log(err);
                res.status(500).json("Echec de la suppression du post")
        })
}

module.exports = {createPost, deletePost};