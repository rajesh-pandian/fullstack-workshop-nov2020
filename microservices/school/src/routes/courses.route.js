const { Router } = require('express');
const CourseController = require('../manage-courses/course.controller');
const CourseMiddleware = require('../manage-courses/course.middleware');
const UserMiddleware = require('../manage-users/auth.middleware')

const router = new Router();
const courseController = new CourseController();
const courseMiddleware = new CourseMiddleware();
const userMiddleware = new UserMiddleware();

router.get('/allResolved', courseController.retrieveAllCoursesResolved);
router.get('/filtered', courseController.retrieveCoursesFiltered);
router.get('/count', courseController.countCourses);
router.get('/withTeacher', courseController.retrieveAllCoursesForTeacher);
router.get('/countUsingTeacher', courseController.countCoursesForTeacher);
router.get('/usingRoom', courseController.retrieveAllCoursesForRoom);
router.get('/usingSubject', courseController.countCoursesForSubject);
router.get('/search', courseController.retrieveCourse);
router.post('/create', userMiddleware.checkAuth, courseMiddleware.validateCreate, courseController.createCourse);
router.put('/update/:courseId', userMiddleware.checkAuth, courseMiddleware.validateUpdate, courseController.updateCourse);
router.delete('/delete/:courseId', userMiddleware.checkAuth, courseMiddleware.validateDelete, courseController.deleteCourse);

module.exports = router;
