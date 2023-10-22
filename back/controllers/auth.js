const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken')

async function signIn(req, res) {
    try {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

        const user = new User({
            username: req.body.username,
            idName: req.body.idName,
            password: hashedPassword,
            birthDate: new Date(req.body.birthDate),
            firstConnection: new Date(),
            public: req.body.public
        })

        try {
            
            const secretKey = process.env.TOKEN_KEY;
            const data = {
                user: {
                    username: req.body.username,
                    idName: req.body.idName,
                    public: req.body.public
                }
            };
            const token = jwt.sign(data, secretKey);
            res.cookie('token', token, {httpOnly: true});
        } catch (error) {
            res.status(500).json(console.log(error))
        }
        
        user.save()
            .then((savedUser) => {
                res.status(201).json(savedUser);;
            })
            .catch((err) => {
                console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', err);
            });

    } catch (error) {
        res.status(500).json("Erreur lors de la création de l'utilisateur");
    }
}

module.exports = signIn;