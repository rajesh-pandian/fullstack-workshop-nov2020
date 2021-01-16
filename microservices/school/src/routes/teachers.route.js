const { Router } = require('express');
const TeacherController = require('../manage-teachers/teacher.controller');
const TeacherMiddleware = require('../manage-teachers/teacher.middleware');
const UserMiddleware = require('../manage-users/auth.middleware')

const router = new Router();
const teacherController = new TeacherController();
const teacherMiddleware = new TeacherMiddleware();
const userMiddleware = new UserMiddleware();

router.get('/all', teacherController.retrieveAllTeachers);
router.get('/filtered', teacherController.retrieveTeachersFiltered);
router.get('/count', teacherController.countTeachers);
router.get('/search', teacherController.retrieveTeacher);
router.post('/create', userMiddleware.checkAuth, teacherMiddleware.validateCreate, teacherController.createTeacher);
router.put('/update/:teacherId', userMiddleware.checkAuth, teacherMiddleware.validateUpdate, teacherController.updateTeacher);
router.delete('/delete/:teacherId', userMiddleware.checkAuth, teacherMiddleware.validateDelete, teacherController.deleteTeacher);

module.exports = router;
