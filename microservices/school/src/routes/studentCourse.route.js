const { Router } = require('express');
const StudentCourseController = require('../manage-student_course/student_course.controller');
const StudentCourseMiddleware = require('../manage-student_course/student_course.middleware');

const router = new Router();
const studentCourseController = new StudentCourseController();
const studentCourseMiddleware = new StudentCourseMiddleware();

router.get('/all', studentCourseController.retrieveAllStudentCourses);

router.get('/searchByStudent', studentCourseController.retrieveStudentCoursesByStudentId);

router.get('/searchByCourse', studentCourseController.retrieveStudentCoursesByCourseId);

router.post('/create', studentCourseMiddleware.validateCreate, studentCourseController.createStudentCourse);

router.put('/update/:studentCourseId', studentCourseMiddleware.validateUpdate, studentCourseController.updateStudentCourse);

router.delete('/delete/:studentCourseId', studentCourseMiddleware.validateDelete, studentCourseController.deleteStudentCourse);

module.exports = router;
