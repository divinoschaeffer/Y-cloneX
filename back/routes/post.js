const express = require('express');
const {createPost, deletePost, likePost, signetPost} = require('../controllers/post');
const verifTokenUser = require('../middlewares/token')

const router = express.Router();

router.post('/create', verifTokenUser, createPost);
router.delete('/delete/:id',verifTokenUser, deletePost);
router.put('/like/:id',verifTokenUser, likePost);
router.put('/signet/:id',verifTokenUser, signetPost);

module.exports = router;