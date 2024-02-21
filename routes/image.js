const express = require('express');
const multer = require('multer');
const verifTokenUser = require('../middlewares/token');
const { uploadImage, getImage } = require('../controllers/image');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'),verifTokenUser, uploadImage);
router.get('/:id', verifTokenUser, getImage);

module.exports = router;