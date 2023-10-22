const express = require('express')
const update = require('../controllers/user')

const router = express.Router();

router.put('/update/:idName', update);

module.exports = router;