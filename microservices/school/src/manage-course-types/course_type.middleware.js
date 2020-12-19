const CourseTypeService = require('./course_type.service');

class Course_typeMiddleware {
    constructor() {
        this.courseTypeService = new CourseTypeService();
    }

    validateCreate= async (req, res, next) =>  {
        const courseTypeDetails = req.body

        let errorList = [];
        let isError = false;
        if (!studentDetails.description || studentDetails.description.trim() === '') {
            isError = true;
            errorList.push('description cannot be Empty')
        }

        if (isError) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    validateUpdate= async (req, res, next) =>  {
        const studentDetails = req.body;
        let errorList = [];
        let isError = false;
        
        const result = await this.studentService.retrieveStudentById(req.params.studentId);
        if (result && result.length === 0) {
            isError = true;
            errorList.push('Id is invalid')
        }

        if (!studentDetails.description || studentDetails.description.trim() === '') {
            isError = true;
            errorList.push('description cannot be Empty')
        }

        if (isError) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    validateDelete= async (req, res, next) =>  {
        let errorList = [];
        let isError = false;
        
        const result = await this.studentService.retrieveStudentById(req.params.studentId);
        if (result && result.length === 0) {
            isError = true;
            errorList.push('Id is invalid')
        }

        if (isError) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }
}

module.exports = Course_typeMiddleware;
