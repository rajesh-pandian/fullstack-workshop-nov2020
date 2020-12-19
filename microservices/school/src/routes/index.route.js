const { Router } = require('express');
const router = new Router();
const teachersRoutes = require('./teachers.route');
const studentsRoutes = require('./students.route');
const roomsRoutes = require('./rooms.route');
const coursesRoutes = require('./courses.route');
const studentCoursesRoutes = require('./studentCourse.route');
const courseTypesRoutes = require('./courseTypess.route');

router.use('/teacher', teachersRoutes);
router.use('/student', studentsRoutes);
router.use('/room', roomsRoutes);
router.use('/course', coursesRoutes);
router.use('/courseTypes', courseTypesRoutes);
router.use('/studentCourse', studentCoursesRoutes);

module.exports = router;
