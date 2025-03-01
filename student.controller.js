const Student = require('./student.model');
const uploadService = require('./upload/upload.service');

exports.createStudent = async (req, res) => {
    try {
        const photo = await uploadService.uploadPhoto(req.file);
        const student = new Student({ ...req.body, photo });
        await student.save();
        res.redirect('/students');
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.render('student/list', { students });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send();
        res.render('student/view', { student });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.editStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send();
        res.render('student/edit', { student });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            const photo = await uploadService.uploadPhoto(req.file);
            updateData.photo = photo;
        }
        const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!student) return res.status(404).send();
        res.redirect('/students');
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).send();
        res.redirect('/students');
    } catch (error) {
        res.status(400).send(error);
    }
};