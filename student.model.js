const mongoose = require('mongoose'); // Import module 'mongoose' để làm việc với MongoDB

// Định nghĩa schema cho sinh viên
const studentSchema = new mongoose.Schema({
    name: String, // Thuộc tính 'name' kiểu chuỗi để lưu tên sinh viên
    age: Number, // Thuộc tính 'age' kiểu số để lưu tuổi sinh viên
    photo: String, // Thuộc tính 'photo' kiểu chuỗi để lưu đường dẫn ảnh của sinh viên
}, { collection: 'students' }); // Đặt tên collection là 'students'

// Tạo model 'Student' từ schema 'studentSchema'
const Student = mongoose.model('Student', studentSchema);

// Xuất model 'Student' để sử dụng trong các tệp khác
module.exports = Student;