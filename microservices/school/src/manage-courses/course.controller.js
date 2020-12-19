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
            return res.status(500).json({ status: 'Failed', message: 'Error creating Course' });
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
            return res.status(500).json({ status: 'Failed', message: 'Error updating Course' });
        }
    } 

    deleteCourse= async (req, res) => {
        try {
            const courseId = req.params.courseId
            await this.courseService.deleteCourse(courseId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error deleting Course' });
        }
    } 

   retrieveAllCoursesResolved= async (req, res) => {
        try {
            const result = await this.courseService.retrieveAllCoursesResolved();
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving all Courses' });
        }
    }



    retrieveAllCoursesForTeacher= async (req, res) => {
        try {
            const teacherId = req.query;
            console.log('teacher id is ', teacherId);
            const result = await this.courseService.retrieveAllCoursesForTeacher(teacherId);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving all Courses for Teacher' });
        }
    }



    retrieveAllCoursesForRoom= async (req, res) => {
        try {
            const roomId = req.query;
            console.log('room id is ', roomId);
            const result = await this.courseService.retrieveAllCoursesForRoom(roomId);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving all Courses for Teacher' });
        }
    }



    retrieveCourse= async (req, res) => {
        try {
            const courseDetails = req.query;
            console.log('course details are ', courseDetails);
            const result = await this.courseService.retrieveCourse(courseDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving Course' });
        }
    } 
}

module.exports = CourseController;
