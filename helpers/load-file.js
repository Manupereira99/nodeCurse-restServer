const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise ((resolve, reject) => {


        
        const { file } = files;
        const nameCut = file.name.split('.');
        const extensionFile = nameCut[nameCut.length - 1];
        
        if (!validExtensions.includes(extensionFile)) {
            return reject(`The extension ${ extensionFile } is not allowed, ${ validExtensions }`);
        }
        
        // Generate name file
        const fileName = uuidv4() + '.' + extensionFile;
        
        uploadPath = path.join(__dirname, '../uploads/', folder ,fileName);
        
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
            
            resolve(fileName)
        });
    });
}

module.exports = {
    uploadFile
}