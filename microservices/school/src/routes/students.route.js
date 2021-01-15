const { Router } = require('express');
const StudentController = require('../manage-students/student.controller');
const StudentMiddleware = require('../manage-students/student.middleware');
const UserMiddleware = require('../manage-users/auth.middleware')

const router = new Router();
const studentController = new StudentController();
const studentMiddleware = new StudentMiddleware();
const userMiddleware = new UserMiddleware();

router.get('/all', studentController.retrieveAllStudents);
router.get('/search', studentController.retrieveStudent);
router.post('/create', userMiddleware.checkAuth, studentMiddleware.validateCreate, studentController.createStudent);
router.put('/update/:studentId', userMiddleware.checkAuth, studentMiddleware.validateUpdate, studentController.updateStudent);
router.delete('/delete/:studentId', userMiddleware.checkAuth, studentMiddleware.validateDelete, studentController.deleteStudent);


module.exports = router;
