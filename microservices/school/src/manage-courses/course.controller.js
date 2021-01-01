const CourseService = require('./course.service');

class CourseController {
    constructor() {
        this.courseService = new CourseService();
    }

    createCourse= async (req, res) => {
        try {
            const courseDetails = req.body;
            await this.courseService.createCourse(courseDetails);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error creating course' });
        }
    } 

    updateCourse= async (req, res) => {
        try {
            const courseId = req.params.courseId
            const courseDetails = req.body;
            await this.courseService.updateCourse(courseDetails, courseId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating course' });
        }
    } 

    deleteCourse= async (req, res) => {
        try {
            const courseId = req.params.courseId
            await this.courseService.deleteCourse(courseId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error deleting course' });
        }
    } 

   retrieveAllCoursesResolved= async (req, res) => {
        try {
            const result = await this.courseService.retrieveAllCoursesResolved();
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving all courses' });
        }
    }

    retrieveCoursesFiltered= async (req, res) => {
        try {
            const courseDetails = req.query;
            const result = await this.courseService.retrieveCoursesFiltered(courseDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving filtered courses' });
        }
    }

    countCourses= async (req, res) => {
        try {
            const courseDetails = req.query;
            const result = await this.courseService.countCourses(courseDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error counting courses' });
        }
    }


    retrieveAllCoursesForTeacher= async (req, res) => {
        try {
            const teacherId = req.query;
            const result = await this.courseService.retrieveAllCoursesForTeacher(teacherId);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving all Courses for teacher' });
        }
    }

    retrieveAllCoursesForRoom= async (req, res) => {
        try {
            const roomId = req.query;
            const result = await this.courseService.retrieveAllCoursesForRoom(roomId);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving all Courses for room' });
        }
    }

    retrieveCourse= async (req, res) => {
        try {
            const courseDetails = req.query;
            const result = await this.courseService.retrieveCourse(courseDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving course' });
        }
    } 
}

module.exports = CourseController;
