const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

function verifTokenUser(req, res, next){
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Aucun jeton d\'accès fourni.' });
    }

      try {
    
        const user = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = user; // utiliser req.user.user pour l'utiliser... je sais... il était tard...
        
        next();
      } catch (erreur) {
        return res.status(401).json({ message: 'Accès non autorisé. Jeton d\'accès invalide.' });
      }
}


module.exports = verifTokenUser;