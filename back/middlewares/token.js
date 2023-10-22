const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

function verifToken(req, res, next){
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Aucun jeton d\'accès fourni.' });
    }

      try {
    
        const payload = jwt.verify(token, process.env.TOKEN_KEY);
        const user = req.body.user;
    
        if (payload.user.idName !== user.idName) {
          return res.status(403).json({ message: 'Accès interdit. Le token ne correspond pas à l\'utilisateur actuel.' });
        }
        
        next();
      } catch (erreur) {
        return res.status(401).json({ message: 'Accès non autorisé. Jeton d\'accès invalide.' });
      }
}
