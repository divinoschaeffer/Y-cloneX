const express = require('express');
const verifTokenUser = require('../middlewares/token');
const { followRequest } = require('../controllers/follow');

const router = express.Router()

router.post('/friendRequest/:idName', verifTokenUser, followRequest);

module.exports = router;