const { Router } = require('express');
const CourseController = require('../manage-courses/course.controller');
const CourseMiddleware = require('../manage-courses/course.middleware');

const router = new Router();
const courseController = new CourseController();
const courseMiddleware = new CourseMiddleware();




router.get('/allResolved', courseController.retrieveAllCoursesResolved);




router.get('/withTeacher', courseController.retrieveAllCoursesForTeacher);



router.get('/usingRoom', courseController.retrieveAllCoursesForRoom);






router.get('/search', courseController.retrieveCourse);

router.post('/create', courseMiddleware.validateCreate, courseController.createCourse);

router.put('/update/:courseId', courseMiddleware.validateUpdate, courseController.updateCourse);

router.delete('/delete/:courseId', courseMiddleware.validateDelete, courseController.deleteCourse);

module.exports = router;
