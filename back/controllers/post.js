const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');

async function createPost(req, res) {
    const currentUser = req.user;
    const idName = currentUser.idName;
    const idPostResponseTo = req.body.responseTo;
    const idPostRetweet = req.body.retweetOf;
    let post = {
        idName: idName,
        username: req.body.username,
        text: req.body.text,
        creationDate: new Date()
    };

    if (idPostResponseTo) {
        post.responseTo = new mongoose.Types.ObjectId(idPostResponseTo);
    }

    if (idPostRetweet) {
        post.retweetOf = new mongoose.Types.ObjectId(idPostRetweet);
    }

    new Post(post).save()
        .then((post) => {
            const update = { $push: { posts: post._id } };
            if (idPostResponseTo != undefined) {
                Post.findByIdAndUpdate(idPostResponseTo, { $push: { comments: new mongoose.Types.ObjectId(idPostResponseTo) } })
                    .then(() => {
                        User.findOneAndUpdate({ idName }, { $push: { posts: post._id, comments: post._id } }, { new: true })
                            .then((user) => res.status(200).json(user));
                    })
            }
            else if (idPostRetweet) {
                Post.findByIdAndUpdate(idPostRetweet, { $inc: { retweets: +1 } })
                    .then(() => {
                        User.findOneAndUpdate({ idName }, { $push: { posts: post._id, retweets: post._id } }, { new: true })
                            .then((user) => res.status(200).json(user));
                    })
            }
            else {
                User.findOneAndUpdate({ idName }, update, { new: true })
                    .then((user) => res.status(200).json(user));
            }
        })

        .catch((err) => {
            console.log(err);
            res.status(500).json("Echec lors de la mis à jour de l'utilisateur");
        })

}

async function deletePost(req, res) {
    const currentUser = req.user;
    const id = new mongoose.Types.ObjectId(req.params.id);
    const idName = currentUser.idName;

    User.findOne({ idName })
        .then((user) => {
            if (user.posts.includes(id)) {
                Post.findByIdAndDelete(id)
                    .then(() => {
                        User.findByIdAndUpdate(user._id, { $pull: { posts: id } }, { new: true })
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

async function likePost(req, res) {
    const currentUser = req.user;
    const idName = currentUser.idName;
    const idPost = req.params.id;
    const mongooseIdPost = new mongoose.Types.ObjectId(idPost);

    User.findOne({ idName })
        .then((user) => {
            if (user.likes.includes(mongooseIdPost)) {
                User.findByIdAndUpdate(user._id, { $pull: { likes: mongooseIdPost } })
                    .then(() => {
                        return Post.findByIdAndUpdate(idPost, { $inc: { likes: -1 } }, { new: true });
                    })
                    .then((postUpdated) => {
                        res.status(200).json(postUpdated);
                    })
            }
            else
                User.findByIdAndUpdate(user._id, { $push: { likes: mongooseIdPost } })
                    .then(() => {
                        return Post.findByIdAndUpdate(idPost, { $inc: { likes: +1 } }, { new: true });
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

async function signetPost(req, res) {
    const currentUser = req.user;
    const idName = currentUser.idName;
    const idPost = req.params.id;
    const mongooseIdPost = new mongoose.Types.ObjectId(idPost);

    User.findOne({ idName })
        .then((user) => {
            if (user.signets.includes(mongooseIdPost)) {
                User.findByIdAndUpdate(user._id, { $pull: { signets: mongooseIdPost } })
                    .then(() => {
                        return Post.findByIdAndUpdate(idPost, { $inc: { signets: -1 } }, { new: true });
                    })
                    .then((postUpdated) => {
                        res.status(200).json(postUpdated);
                    })
            }
            else
                User.findByIdAndUpdate(user._id, { $push: { signets: mongooseIdPost } })
                    .then(() => {
                        return Post.findByIdAndUpdate(idPost, { $inc: { signets: +1 } }, { new: true });
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

async function getAll(req, res) {
    Post.find()
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Erreur de récupération des posts");
        })
}

async function getPost(req, res) {
    const idPost = req.params.id
    Post.findById(idPost)
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = { createPost, deletePost, likePost, signetPost, getAll, getPost };