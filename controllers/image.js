const fs = require('fs');
const Image = require('../models/Image');

async function getImage(req, res) {
    Image.findById(req.params.id)
    .then((img) => {
        res.set('Content-Type', img.contentType);
        res.send(img.data);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send(err);
    })
}

async function uploadImage(req, res) {
    const newImage = new Image({
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
        filename: req.file.filename
    });
    newImage.save()
        .then((img) => {
            res.status(200).json(img.filename);
        })
        .catch(err => res.status(400).send(err));
}

module.exports = {getImage, uploadImage};