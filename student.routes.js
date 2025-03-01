const express = require('express'); // Import module 'express' để tạo router
const multer = require('multer'); // Import module 'multer' để xử lý upload tệp
const studentController = require('./student.controller'); // Import controller để xử lý các yêu cầu liên quan đến sinh viên

const router = express.Router(); // Tạo một đối tượng router từ express
const upload = multer({ dest: 'uploads/' }); // Cấu hình multer để lưu trữ tệp upload vào thư mục 'uploads'

// Định nghĩa route để hiển thị trang tạo sinh viên
router.get('/create', (req, res) => {
    res.render('student/create'); // Render trang 'create.ejs' trong thư mục 'views/student'
});

// Định nghĩa route để xử lý yêu cầu POST tạo sinh viên mới
router.post('/', upload.single('photo'), studentController.createStudent); // Sử dụng multer để xử lý upload tệp ảnh

// Định nghĩa route để lấy danh sách tất cả sinh viên
router.get('/', studentController.getStudents); // Gọi phương thức 'getStudents' từ controller

// Định nghĩa route để lấy thông tin chi tiết của một sinh viên
router.get('/:id', studentController.getStudent); // Gọi phương thức 'getStudent' từ controller

// Định nghĩa route để hiển thị trang chỉnh sửa thông tin sinh viên
router.get('/:id/edit', studentController.editStudent); // Gọi phương thức 'editStudent' từ controller

// Định nghĩa route để xử lý yêu cầu PUT cập nhật thông tin sinh viên
router.put('/:id', upload.single('photo'), studentController.updateStudent); // Sử dụng multer để xử lý upload tệp ảnh nếu có

// Định nghĩa route để xử lý yêu cầu DELETE xóa sinh viên
router.delete('/:id', studentController.deleteStudent); // Gọi phương thức 'deleteStudent' từ controller

module.exports = router; // Xuất đối tượng router để sử dụng trong các tệp khác