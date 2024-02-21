const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');

// Mettre à jour un utilisateur
async function update(req, res) {

    const idName = req.params.idName;
    const update = req.body;
    const currentUser = req.user;

    if (currentUser.idName !== idName) {
        res.status(500).json("Vous n'avez pas l'autorisation");
    }
    else {
        User.findOneAndUpdate({ idName }, update, { new: true })
            .then((user) => res.status(201).json({message: "changements réussis"}))
            .catch((err) => {
                res.status(500).json("Errer lors de la mise à jour");
                console.log(err);
            })
    }
}

// Récupérer un utilisateur
async function getUser(req, res) {

    const idName = req.params.idName;

    User.find({ idName })
        .then((user) => {
            const { password, ...newUser } = user[0]._doc;
            res.status(201).json(newUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Erreur chargement de l'utilisateur")
        })
}

// Récupérer tous les utilisateurs
async function getAll(req, res) {

    const currentUser = req.user.user;

    User.find()
        .then((users) => {
            if (currentUser.role > 0)
                res.status(201).json(users);
            else {
                const newUsers = users.map((user) => {
                    const { role, _id, signets, conversation, __v, password, ...newUser } = user._doc;
                    return newUser;
                })
                res.status(201).json(newUsers);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Erreur chargement des utilisateurs")
        })
}

async function getAllPosts(req, res) {

    const user = req.params.user;
    const userPosts = [];

    User.findOne({ idName: user })
        .then((user) => {

            const postPromises = user.posts.map((idPost) => {
                return Post.findById(idPost)
                    .then((post) => {
                        userPosts.push(post);
                    });
            });

            return Promise.all(postPromises);
        })
        .then(() => {
            res.status(200).json(userPosts);
        })
        .catch((e) => {
            console.log(e);
            res.status(500).json("Echec de la récupération des posts");
        })
}

async function isUser(req, res) {
    const idName = req.params.idName;
    User.findOne({ idName })
        .then((user) => {
            if (user)
                res.status(200).json({ isUser: true })
            else
                res.status(200).json({ isUser: false })
        })
        .catch((e) => res.status(500).json({ isUser: false }))
}

module.exports = { update, getAll, getUser, getAllPosts, isUser };