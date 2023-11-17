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

module.exports = {followRequest};