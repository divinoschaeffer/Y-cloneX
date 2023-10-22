const express = require('express');
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authRoute = require('./routes/auth.js')

dotenv.config(); 

const port = process.env.PORT || 3000; // Port sur lequel le serveur écoutera


// Connexion base de donnée
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connecté à la base de données MongoDB');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données MongoDB :', err);
  });

  mongoose.connection.on('error', (err) => {
    console.error('Erreur de connexion à MongoDB :', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Déconnexion de MongoDB');
  });

// Middleware pour gérer les données au format JSON
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoute);

app.listen(port, () => {
    console.log('Connexion sur le port');
});

// Route racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Express !');
});
