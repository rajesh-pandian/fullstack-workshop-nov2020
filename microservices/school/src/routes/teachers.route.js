const { Router } = require('express');
const TeacherController = require('../manage-teachers/teacher.controller');
const TeacherMiddleware = require('../manage-teachers/teacher.middleware');

const router = new Router();
const teacherController = new TeacherController();
const teacherMiddleware = new TeacherMiddleware();

router.get('/all', teacherController.retrieveAllTeachers);

router.get('/search', teacherController.retrieveTeacher);

router.post('/create', teacherMiddleware.validateCreate, teacherController.createTeacher);

router.put('/update/:teacherId', teacherMiddleware.validateUpdate, teacherController.updateTeacher);

router.delete('/delete/:teacherId', teacherMiddleware.validateDelete, teacherController.deleteTeacher);

module.exports = router;
