const express = require('express');
const {createPost, deletePost} = require('../controllers/post');
const verifTokenUser = require('../middlewares/token')

const router = express.Router();

router.post('/create', verifTokenUser, createPost);
router.delete('/delete/:id',verifTokenUser, deletePost);

module.exports = router;