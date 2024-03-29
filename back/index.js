const express = require('express');
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const path = require("path")
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const postRoute = require('./routes/post.js');
const followRoute = require('./routes/follow.js');
const imageRoute = require('./routes/image.js');

dotenv.config(); 

const port = process.env.PORT || 3000; // Port sur lequel le serveur écoutera


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


const corsOptions = {
  origin: true,
  credentials: true, 
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', express.static(path.join(__dirname,"uploads")));
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/follow',followRoute);
app.use('/api/image', imageRoute);

app.listen(port, () => {
    console.log('Connexion sur le port');
});

app.get('/', (req, res) => {
  res.json('API Y');
});
