const { Router } = require('express');
const StudentCourseController = require('../manage-student_course/student_course.controller');
const StudentCourseMiddleware = require('../manage-student_course/student_course.middleware');
const UserMiddleware = require('../manage-users/auth.middleware')

const router = new Router();
const studentCourseController = new StudentCourseController();
const studentCourseMiddleware = new StudentCourseMiddleware();
const userMiddleware = new UserMiddleware();


router.get('/all', studentCourseController.retrieveAllStudentCourses);
router.get('/filtered', studentCourseController.retrieveStudentCoursesFiltered);
router.get('/count', studentCourseController.countStudentCourses);
router.get('/searchByStudent', studentCourseController.retrieveStudentCoursesByStudentId);
router.get('/searchByCourse', studentCourseController.retrieveStudentCoursesByCourseId);
router.post('/create', userMiddleware.checkAuth, studentCourseMiddleware.validateCreate, studentCourseController.createStudentCourse);
router.put('/update/:studentCourseId', userMiddleware.checkAuth, studentCourseMiddleware.validateUpdate, studentCourseController.updateStudentCourse);
router.delete('/delete/:studentCourseId', userMiddleware.checkAuth, studentCourseMiddleware.validateDelete, studentCourseController.deleteStudentCourse);


module.exports = router;
