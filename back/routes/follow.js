const express = require('express');
const verifTokenUser = require('../middlewares/token');
const { followRequest, acceptFollow } = require('../controllers/follow');

const router = express.Router()

router.post('/friendRequest/:idName', verifTokenUser, followRequest);
router.post('/acceptRequest/:idName', verifTokenUser, acceptFollow);

module.exports = router;