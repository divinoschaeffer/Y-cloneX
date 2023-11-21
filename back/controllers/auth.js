const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// Enregistrement d'un nouvel utilisateur
async function signIn(req, res) {
    
    const existingUser = await User.findOne({idName: req.body.idName});
    if(existingUser)
        return res.status(409).json("Nom d'utilisateur déjà pris");

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    let token;

    const user = new User({
        username: req.body.username,
        idName: req.body.idName,
        password: hashedPassword,
        birthDate: new Date(req.body.birthDate),
        firstConnection: new Date(),
        public: req.body.public
    })
        
    
    user.save()
        .then((savedUser) => {

            const secretKey = process.env.TOKEN_KEY;
            token = jwt.sign({
                _id: req.body._id,
                idName: req.body.idName,
                public: req.body.public,
                role: req.body.role
            }, secretKey
            ,{expiresIn: '10h'}
            );

            res.cookie('token', token, {httpOnly: true});

            res.status(201).json({
                token, 
                user:
                {
                    id: savedUser._id,
                    idName: savedUser.idName, 
                    public: savedUser.public, 
                    role: savedUser.role}
                })
            })
        .catch((err) => {
            console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', err);
        });

}

// Connexion d'un utilisateur
async function login(req, res){
    const {idName, password} = req.body;
    let loggedUser;
    let token;

    await User.findOne({idName})
        .then((user) => loggedUser = user)
        .catch((err) =>  {
            res.status(404).json({message: "Utilisateur non trouvé"});
            console.log(err);
        })

    await bcrypt.compare(password, loggedUser.password)
        .then(() => {
            const secretKey = process.env.TOKEN_KEY;
            token = jwt.sign({
                _id: req.body._id,
                idName: req.body.idName,
                public: req.body.public,
                role: req.body.role
            }, secretKey
            ,{expiresIn: '10h'}
            );
            res.status(201).json({
                token, 
                user:
                {
                    id: loggedUser._id,
                    idName: loggedUser.idName, 
                    public: loggedUser.public, 
                    role: loggedUser.role}
                })
            })
        .catch((err) => {
            console.log(err);
            res.status(404).json("L'authentification a échoué");
        })
}

module.exports = {signIn, login};