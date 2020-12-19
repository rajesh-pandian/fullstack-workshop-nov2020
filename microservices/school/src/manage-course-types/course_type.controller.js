const CourseTypeService = require('./course_type.service');

class Course_typeController {
    constructor() {
        this.courseTypeService = new CourseTypeService();
    }

    createCourseType= async (req, res) => {
        try {
            const courseTypeDetails = req.body;
            await this.courseTypeService.createCourseType(courseTypeDetails);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error creating CourseType' });
        }
    } 

    updateCourseType= async (req, res) => {
        try {
            const courseTypeId = req.params.courseTypeId
            const courseTypeDetails = req.body;
            await this.courseTypeService.updateCourseType(courseTypeDetails, courseTypeId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating CourseTypes' });
        }
    } 

    deleteCourseType= async (req, res) => {
        try {
            const courseTypeId = req.params.courseTypeIdId
            await this.courseTypeService.deleteCourseType(courseTypeId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating CourseTypes' });
        }
    } 

    retrieveAllCourseTypes= async (req, res) => {
        try {
            const courseTypeDetails = req.body;
            const result = await this.courseTypeService.retrieveAllCourseTypes(courseTypeDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieve all CourseTypes' });
        }
    } 

    retrieveCourseType= async (req, res) => {
        try {
            const courseTypeDetails = req.query;
            console.log('student details are ', courseTypeDetails);
            const result = await this.courseTypeService.retrieveCourseType(courseTypeDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieve CourseType' });
        }
    } 
}

module.exports = Course_typeController;
