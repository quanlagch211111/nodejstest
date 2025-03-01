const path = require('path'); // Import module 'path' để xử lý và chuyển đổi đường dẫn tệp
const fs = require('fs'); // Import module 'fs' để làm việc với hệ thống tệp

// Hàm uploadPhoto nhận vào một đối tượng tệp và trả về một Promise
exports.uploadPhoto = (file) => {
    return new Promise((resolve, reject) => {
        // Xác định đường dẫn đích nơi tệp sẽ được di chuyển tới
        const targetPath = path.join(__dirname, '../uploads/', file.originalname);
        
        // Di chuyển tệp từ vị trí tạm thời đến vị trí đích
        fs.rename(file.path, targetPath, (err) => {
            if (err) {
                // Nếu có lỗi xảy ra trong quá trình di chuyển tệp, in lỗi ra console và từ chối Promise
                console.error('Error moving file:', err);
                reject(err);
            } else {
                // Nếu di chuyển tệp thành công, in thông báo ra console và giải quyết Promise với đường dẫn tệp mới
                console.log('File moved to:', targetPath);
                resolve(`/uploads/${file.originalname}`);
            }
        });
    });
};