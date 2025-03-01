const path = require('path');
const fs = require('fs');

exports.uploadPhoto = (file) => {
    return new Promise((resolve, reject) => {
        const targetPath = path.join(__dirname, '../uploads/', file.originalname);
        fs.rename(file.path, targetPath, (err) => {
            if (err) {
                console.error('Error moving file:', err);
                reject(err);
            } else {
                console.log('File moved to:', targetPath);
                resolve(`/uploads/${file.originalname}`);
            }
        });
    });
};