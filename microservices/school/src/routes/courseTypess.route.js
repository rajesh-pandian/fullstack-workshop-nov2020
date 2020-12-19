const { Router } = require('express');
const CourseTypeController = require('../manage-course-types/course_type.controller');
const CourseTypeMiddleware = require('../manage-course-types/course_type.middleware');

const router = new Router();
const courseTypeController = new CourseTypeController();
const courseTypeMiddleware = new CourseTypeMiddleware();

router.get('/all', courseTypeController.retrieveAllCourseTypes);

router.get('/search', courseTypeController.retrieveCourseType);

router.post('/create', courseTypeMiddleware.validateCreate, courseTypeController.createCourseType);

router.put('/update/:courseTypeId', courseTypeMiddleware.validateUpdate, courseTypeController.updateCourseType);

router.delete('/delete/:courseTypeId', courseTypeMiddleware.validateDelete, courseTypeController.deleteCourseType);

module.exports = router;
