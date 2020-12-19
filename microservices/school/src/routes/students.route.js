const { Router } = require('express');
const StudentController = require('../manage-students/student.controller');
const StudentMiddleware = require('../manage-students/student.middleware');

const router = new Router();
const studentController = new StudentController();
const studentMiddleware = new StudentMiddleware();

router.get('/all', studentController.retrieveAllStudents);

router.get('/search', studentController.retrieveStudent);

router.post('/create', studentMiddleware.validateCreate, studentController.createStudent);

router.put('/update/:studentId', studentMiddleware.validateUpdate, studentController.updateStudent);

router.delete('/delete/:studentId', studentMiddleware.validateDelete, studentController.deleteStudent);

module.exports = router;
