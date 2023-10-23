const express = require('express');
const bcrypt = require('bcrypt');
const {signIn, login} = require('../controllers/auth')

const router = express.Router();

router.post('/sign-in', signIn); // enregistrer un nouvel utilisateur
router.post('/login', login) // connexion d'un utilisateur

module.exports =  router;