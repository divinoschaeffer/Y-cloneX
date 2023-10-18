const express = require('express');
const bcrypt = require('bcrypt');

export const singIn = async (req, res, next) =>{
    try {

        const saltRounds = 10;
        let hashedPassword;

        try {
            hashedPassword = bcrypt.hash(req.body.password, saltRounds);
        } catch (error) {
            console.error("Erreur lors du hachage du mot de passe");
            res.status(500);
        }

        const user = new User({
            username: req.body.username,
            idName: req.body.idName,
            password: hashedPassword,
            birthdate: req.body.birthdate,
            firstConnection: new Date(),
            public: req.body.public
        })

        const saveUser = await user.save();
        res.status(201).json(saveUser);

    } catch (error) {
        res.status(500).json("Erreur lors de l'enregistrement de l'utilisateur");
    }
}