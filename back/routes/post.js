const express = require('express');
const create = require('../controllers/post');
const verifTokenUser = require('../middlewares/token')

const router = express.Router();

router.post('/create', verifTokenUser, create);

module.exports = router;