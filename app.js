const express = require('express'); // Import module 'express' để tạo ứng dụng web
const mongoose = require('mongoose'); // Import module 'mongoose' để làm việc với MongoDB
const methodOverride = require('method-override'); // Import module 'method-override' để hỗ trợ các phương thức HTTP như PUT và DELETE
const studentRoutes = require('./student.routes'); // Import các route liên quan đến sinh viên
const path = require('path'); // Import module 'path' để xử lý và chuyển đổi đường dẫn tệp

const app = express(); // Tạo một ứng dụng Express
const PORT = process.env.PORT || 3000; // Đặt cổng cho ứng dụng, sử dụng biến môi trường PORT nếu có, nếu không thì mặc định là 3000

// Kết nối đến MongoDB với database tên là 'web'
mongoose.connect('mongodb://localhost:27017/web', {
    useNewUrlParser: true, // Sử dụng cú pháp URL mới của MongoDB
    useUnifiedTopology: true, // Sử dụng engine kết nối mới của MongoDB
});

app.set('view engine', 'ejs'); // Đặt view engine là 'ejs' để render các tệp EJS
app.set('views', path.join(__dirname, 'views')); // Đặt thư mục chứa các tệp view là 'views'

// Sử dụng các middleware
app.use(express.json()); // Middleware để parse các yêu cầu với JSON payloads
app.use(express.urlencoded({ extended: true })); // Middleware để parse các yêu cầu với URL-encoded payloads
app.use(methodOverride('_method')); // Middleware để hỗ trợ các phương thức HTTP như PUT và DELETE thông qua query parameter '_method'
app.use('/students', studentRoutes); // Sử dụng các route liên quan đến sinh viên
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Cung cấp các tệp tĩnh trong thư mục 'uploads'

// Lắng nghe các yêu cầu trên cổng đã định
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // In ra thông báo khi server đã khởi động thành công
});