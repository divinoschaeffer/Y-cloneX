const express = require('express');
const bcrypt = require('bcrypt');
const {signIn, login} = require('../controllers/auth')

const router = express.Router();

router.post('/sign-in', signIn);
router.post('/login', login)

module.exports =  router;