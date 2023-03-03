const path = require('path');
const request = require('express');



const loadFile = async (req = request, res ) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json('No files were uploaded.');
        return;
    }
  
    const { file } = req.files.files;

    const nameCut = file.name.split('.');
    const extensionFile = nameCut[nameCut.length - 1];

    // Validate extension

    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if (!validExtensions.includes(extensionFile)) {
        return res.status(400).json({ 
            msg: `The extension ${ extensionFile } is not allowed, ${ validExtensions }`
     });
    }




  
    // uploadPath = path.join(__dirname, '../uploads/', file.name);
  
    // file.mv(uploadPath, (err) => {
    //     if (err) {
    //         return res.status(500).json(err);
    //     }
    
    //     res.json({
    //         msg: 'File uploaded to ' + uploadPath
    //     });
    // });

}


module.exports = {
    loadFile
}