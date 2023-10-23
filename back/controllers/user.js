const express = require('express');
const User = require('../models/User');

// Mettre à jour un utilisateur
async function update(req, res){

    const idName = req.params.idName;
    const update = req.body;
    const currentUser = req.user.user;

    if(currentUser.idName !== idName && currentUser.role === 0){
        res.status(500).json("Vous n'avez pas l'autorisation");
    }
    else{
        User.findOneAndUpdate({idName},update, {new: true})
        .then((user) => res.status(201).json(user))
        .catch((err) => {
            res.status(500).json("Errer lors de la mise à jour");
            console.log(err);
        })
    }
}

// Récupérer un utilisateur
async function getUser(req, res){

    const idName = req.params.idName;

    User.find({idName})
        .then((user) => {
            if (idName === req.user.user.idName || req.user.user.role > 0)
                res.status(201).json(user);
            else {
                const {role, _id, signets, conversation, __v, password, ...newUser} = user[0]._doc;
                res.status(201).json(newUser);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Erreur chargement de l'utilisateur")
        })
}

// Récupérer tous les utilisateurs
async function getAll(req, res){

    const currentUser = req.user.user;

    User.find()
        .then((users) => {
            if (currentUser.role > 0)
                res.status(201).json(users);
            else {
                const newUsers = users.map((user) => { 
                    const {role, _id, signets, conversation, __v, password, ...newUser} = user._doc;
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

module.exports = {update, getAll, getUser};