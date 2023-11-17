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
                        User.findOneAndUpdate({idName}, {$push: {posts: post._id, comments: post_id}}, {new: true})
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

async function likePost(req, res){
    const currentUser = req.user.user;
    const idName = currentUser.idName;
    const idPost = req.params.id;
    const mongooseIdPost = new mongoose.Types.ObjectId(idPost);

    User.findOne({idName})
    .then((user) => {
        if(user.likes.includes(mongooseIdPost)){
            User.findByIdAndUpdate(user._id,{$pull: {likes: mongooseIdPost}})
            .then(() => {
                return Post.findByIdAndUpdate(idPost,{$inc :{likes: -1}}, {new: true});
            })
            .then((postUpdated) => {
                res.status(200).json(postUpdated);
            })
        }
        else
            User.findByIdAndUpdate(user._id,{$push: {likes: mongooseIdPost}})
            .then(() => {
                return Post.findByIdAndUpdate(idPost,{$inc :{likes: +1}}, {new: true});
            })
            .then((postUpdated) => {
                res.status(200).json(postUpdated);
            })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Erreur au niveau du like du post");
    })
}

async function signetPost(req, res){
    const currentUser = req.user.user;
    const idName = currentUser.idName;
    const idPost = req.params.id;
    const mongooseIdPost = new mongoose.Types.ObjectId(idPost);

    User.findOne({idName})
    .then((user) => {
        if(user.signets.includes(mongooseIdPost)){
            User.findByIdAndUpdate(user._id,{$pull: {signets: mongooseIdPost}})
            .then(() => {
                return Post.findByIdAndUpdate(idPost,{$inc :{signets: -1}}, {new: true});
            })
            .then((postUpdated) => {
                res.status(200).json(postUpdated);
            })
        }
        else
            User.findByIdAndUpdate(user._id,{$push: {signets: mongooseIdPost}})
            .then(() => {
                return Post.findByIdAndUpdate(idPost,{$inc :{signets: +1}}, {new: true});
            })
            .then((postUpdated) => {
                res.status(200).json(postUpdated);
            })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Erreur au niveau du signet du post");
    })
}

module.exports = {createPost, deletePost, likePost, signetPost};