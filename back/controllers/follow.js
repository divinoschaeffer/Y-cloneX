const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

async function followRequest(req, res){
    const currentUser = req.user.user;
    const idNameRequest = req.params.idName;

    User.findOne({idName: idNameRequest})
    .then((userRequest) => {
    
        if(userRequest.followers.includes(currentUser.idName))
                res.status(200).json("La personne est déjà suivie");

        else if(userRequest.public){

            User.findByIdAndUpdate(userRequest._id,{$push: {followers: currentUser.idName}})
            .then(() => {
                return User.findOneAndUpdate({idName: currentUser.idName}, {$push: {follows: userRequest.idName}}, {new: true})
            })
            .then((userUpdated) => {
                res.status(200).json(userUpdated);
            })
        }
        else{

            User.findByIdAndUpdate(userRequest._id,{$push: {followRequest: currentUser.idName}},{new: true})
            .then((userUpdated) => {
                res.status(200).json(userUpdated);
            })
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Erreur lors de la demande d'ami");
    })
}

async function acceptFollow(req, res){
    const currentUser = req.user.user;
    const idNameReq = req.params.idName;

    User.findOne({idName: currentUser.idName})
    .then((user) => {
        if(!user.followRequest.includes(idNameReq)){
            res.status(200).json("Aucune demande d'ami de la part de cet utilisateur");
        }
        else{
            return User.findOneAndUpdate({idName: currentUser.idName}, {$push: {followers: idNameReq}, $pull: {followRequest: idNameReq}}, {new: true});
        }
    })
    .then((updatedUser) => {
        res.status(200).json(updatedUser);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Echec de l'acceptation de follow");
    })
}

async function refusFollow(req, res){
    const currentUser = req.user.user;
    const idNameRequest = req.params.idName;

    User.findOneAndUpdate({idName: currentUser.idName}, {$pull: {followRequest: idNameRequest}},{new: true})
    .then((userUpdated) => {
        res.status(200).json(userUpdated);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Erreur lors de la demande d'ami");
    })
}

module.exports = {followRequest, acceptFollow, refusFollow}