const express = require('express');
const User = require('../models/User');

async function update(req, res){
    const idName = req.params.idName;
    const update = req.body;
    User.findOneAndUpdate({idName},update, {new: true})
        .then((user) => res.status(201).json(user))
        .catch((err) => {
            res.status(500).json("Errer lors de la mise à jour");
            console.log(err);
        })
}

module.exports = update;