const express = require('express')
const {update, getAll, getUser, getAllPosts} = require('../controllers/user')
const verifTokenUser = require('../middlewares/token')

const router = express.Router();

router.get('/getAll',verifTokenUser, getAll); // récupérer tous les utilisateurs
router.get('/:idName', verifTokenUser, getUser); // récupérer un utilisateur 
router.put('/update/:idName',verifTokenUser, update); // mettre à jour un utilisateur
router.get('/getAllPosts/:user', getAllPosts);

module.exports = router;