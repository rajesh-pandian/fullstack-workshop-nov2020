const { Router } = require('express');
const CourseTypeController = require('../manage-course-types/course_type.controller');
const CourseTypeMiddleware = require('../manage-course-types/course_type.middleware');
const UserMiddleware = require('../manage-users/auth.middleware')

const router = new Router();
const courseTypeController = new CourseTypeController();
const courseTypeMiddleware = new CourseTypeMiddleware();
const userMiddleware = new UserMiddleware();

router.get('/all', courseTypeController.retrieveAllCourseTypes);
router.get('/search', courseTypeController.retrieveCourseType);
router.post('/create', userMiddleware.checkAuth, courseTypeMiddleware.validateCreate, courseTypeController.createCourseType);
router.put('/update/:courseTypeId', userMiddleware.checkAuth, courseTypeMiddleware.validateUpdate, courseTypeController.updateCourseType);
router.delete('/delete/:courseTypeId', userMiddleware.checkAuth, courseTypeMiddleware.validateDelete, courseTypeController.deleteCourseType);

module.exports = router;
