const express = require('express');
const multer = require('multer');
const studentController = require('./student.controller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/create', (req, res) => {
    res.render('student/create');
});

router.post('/', upload.single('photo'), studentController.createStudent);
router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudent);
router.get('/:id/edit', studentController.editStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;