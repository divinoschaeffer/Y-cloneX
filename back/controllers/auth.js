const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// Enregistrement d'un nouvel utilisateur
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
                    public: req.body.public,
                    role: req.body.role
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

// Connexion d'un utilisateur
async function login(req, res){
    const {idName, password} = req.body;
    let loggedUser;
    await User.findOne({idName})
        .then((user) => loggedUser = user)
        .catch((err) =>  {
            res.status(404).json({message: "Utilisateur non trouvé"});
            console.log(err);
        })

    await bcrypt.compare(password, loggedUser.password)
        .then(() => {
            try {
            
                const secretKey = process.env.TOKEN_KEY;
                const data = {
                    user: {
                        username: loggedUser.username,
                        idName: loggedUser.idName,
                        public: loggedUser.public,
                        role: loggedUser.role
                    }
                };
                const token = jwt.sign(data, secretKey);
                res.cookie('token', token, {httpOnly: true});
            } catch (error) {
                res.status(500).json(console.log(error))
            }
            res.status(201).json("Authentification réussie")
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json("L'authentification a échoué");
        })
}

module.exports = {signIn, login};