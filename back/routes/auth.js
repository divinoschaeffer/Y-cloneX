const express = require('express');
const bcrypt = require('bcrypt');
const signIn = require('../controllers/auth')

const router = express.Router();

router.post('/sign-in', signIn);

module.exports =  router;