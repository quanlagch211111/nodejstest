const Student = require('./student.model'); // Import model 'Student' để làm việc với dữ liệu sinh viên trong MongoDB
const uploadService = require('./upload/upload.service'); // Import service 'uploadService' để xử lý upload tệp

// Hàm createStudent để tạo sinh viên mới
exports.createStudent = async (req, res) => {
    try {
        const photo = await uploadService.uploadPhoto(req.file); // Upload ảnh và lấy đường dẫn ảnh
        const student = new Student({ ...req.body, photo }); // Tạo đối tượng sinh viên mới với dữ liệu từ request và đường dẫn ảnh
        await student.save(); // Lưu sinh viên vào MongoDB
        res.redirect('/students'); // Chuyển hướng về trang danh sách sinh viên
    } catch (error) {
        res.status(400).send(error); // Gửi lỗi nếu có vấn đề xảy ra
    }
};

// Hàm getStudents để lấy danh sách tất cả sinh viên
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find(); // Lấy tất cả sinh viên từ MongoDB
        res.render('student/list', { students }); // Render trang 'list.ejs' với dữ liệu sinh viên
    } catch (error) {
        res.status(400).send(error); // Gửi lỗi nếu có vấn đề xảy ra
    }
};

// Hàm getStudent để lấy thông tin chi tiết của một sinh viên
exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id); // Tìm sinh viên theo ID
        if (!student) return res.status(404).send(); // Nếu không tìm thấy sinh viên, trả về lỗi 404
        res.render('student/view', { student }); // Render trang 'view.ejs' với dữ liệu sinh viên
    } catch (error) {
        res.status(400).send(error); // Gửi lỗi nếu có vấn đề xảy ra
    }
};

// Hàm editStudent để hiển thị trang chỉnh sửa thông tin sinh viên
exports.editStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id); // Tìm sinh viên theo ID
        if (!student) return res.status(404).send(); // Nếu không tìm thấy sinh viên, trả về lỗi 404
        res.render('student/edit', { student }); // Render trang 'edit.ejs' với dữ liệu sinh viên
    } catch (error) {
        res.status(400).send(error); // Gửi lỗi nếu có vấn đề xảy ra
    }
};

// Hàm updateStudent để cập nhật thông tin sinh viên
exports.updateStudent = async (req, res) => {
    try {
        const updateData = { ...req.body }; // Lấy dữ liệu cập nhật từ request body
        if (req.file) {
            const photo = await uploadService.uploadPhoto(req.file); // Nếu có tệp ảnh mới, upload ảnh và lấy đường dẫn ảnh
            updateData.photo = photo; // Cập nhật đường dẫn ảnh mới vào dữ liệu cập nhật
        }
        const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }); // Cập nhật sinh viên trong MongoDB
        if (!student) return res.status(404).send(); // Nếu không tìm thấy sinh viên, trả về lỗi 404
        res.redirect('/students'); // Chuyển hướng về trang danh sách sinh viên
    } catch (error) {
        res.status(400).send(error); // Gửi lỗi nếu có vấn đề xảy ra
    }
};

// Hàm deleteStudent để xóa sinh viên
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id); // Xóa sinh viên theo ID
        if (!student) return res.status(404).send(); // Nếu không tìm thấy sinh viên, trả về lỗi 404
        res.redirect('/students'); // Chuyển hướng về trang danh sách sinh viên
    } catch (error) {
        res.status(400).send(error); // Gửi lỗi nếu có vấn đề xảy ra
    }
};