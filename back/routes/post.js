const express = require('express');
const {createPost, deletePost, likePost, signetPost, getAll, getPost} = require('../controllers/post');
const verifTokenUser = require('../middlewares/token')

const router = express.Router();

router.get('/get-all', verifTokenUser, getAll);
router.get('/get/:id',verifTokenUser, getPost)
router.post('/create', verifTokenUser, createPost);
router.delete('/delete/:id',verifTokenUser, deletePost);
router.put('/like/:id',verifTokenUser, likePost);
router.put('/signet/:id',verifTokenUser, signetPost);

module.exports = router;