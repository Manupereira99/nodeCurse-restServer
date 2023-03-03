
const {uploadFile} = require('../helpers/load-file')
const { User, Product } = require('../models')
const path = require('path');
const fs = require('fs');

const loadFile = async (req = request, res ) => {

    try {
        // const completePath = await uploadFile(req.files, ['txt', 'md'], 'text');
        const completePath = await uploadFile(req.files, undefined, 'img');
        res.json({
            name: completePath
        })
    
    } catch (msg) {
        res.status(400).json({msg});
    }

}

const updateImage = async (req, res) => {

    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `There is no user with id ${id}`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `There is no product with id ${id}`
                });
            }
        break;
    
        default:
            return res.status(500).json({
                msg: 'I forgot to validate this'
            });
    }

    // Clean previous images
    if (model.img) {
        // Delete image from server
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);
        if ( fs.existsSync( pathImage )){
            fs.unlinkSync( pathImage )
        }
    }

    const imgName = await uploadFile(req.files, undefined, collection);
    model.img = imgName;
    
    await model.save();

    res.json(model);

}

const showImage = async (req, res) => {

    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `There is no user with id ${id}`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `There is no product with id ${id}`
                });
            }
        break;
    
        default:
            return res.status(500).json({
                msg: 'I forgot to validate this'
            });
    }

    // Clean previous images
    if (model.img) {
        // Delete image from server
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);
        if ( fs.existsSync( pathImage )){
            return res.sendFile( pathImage);
        }
    }

    const pathImage = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile( pathImage );
}



module.exports = {
    loadFile,
    updateImage,
    showImage
}