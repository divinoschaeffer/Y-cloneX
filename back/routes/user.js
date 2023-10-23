const express = require('express')
const {update, getAll, getUser} = require('../controllers/user')
const verifTokenUser = require('../middlewares/token')

const router = express.Router();

router.get('/getAll',verifTokenUser, getAll);
router.get('/:idName', verifTokenUser, getUser);
router.put('/update/:idName',verifTokenUser, update);

module.exports = router;