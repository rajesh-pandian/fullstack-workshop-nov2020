const StudentCourseService = require('./student_course.service');

class Student_courseMiddleware {
    constructor() {
        this.studentCourseService = new StudentCourseService();
    }

    validateCreate= async (req, res, next) =>  {
        const studentCourseDetails = req.body

        let errorList = [];
        let isError = false;

        if (!studentCourseDetails.studentId || studentCourseDetails.studentId < 0) {
            isError = true;
            errorList.push('Student Id cannot be Empty or less than 0')
        }

        if (!studentCourseDetails.courseId || studentCourseDetails.courseId < 0) {
            isError = true;
            errorList.push('Course Id cannot be Empty or less than 0')
        }

        const result = await this.studentCourseService.retrieveStudentCoursesByStudentIdAndCourseId(studentCourseDetails);
        if (result && result.length != 0 ) {
            isError = true;
            errorList.push('StudentCourse already exists')
        }

        if (isError) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    validateUpdate= async (req, res, next) =>  {
        const studentCourseDetails = req.body;
        let errorList = [];
        let isError = false;

        const result = await this.studentCourseService.retrieveStudentCourseById(req.params.studentCourseId);
        if (result && result.length === 0) {
            isError = true;
            errorList.push('Id is invalid')
        }

        if (!studentCourseDetails.studentId || studentCourseDetails.studentId < 0) {
            isError = true;
            errorList.push('Student Id cannot be Empty or less than 0')
        }

        if (!studentCourseDetails.courseId || studentCourseDetails.courseId < 0) {
            isError = true;
            errorList.push('Course Id cannot be Empty or less than 0')
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
        
        const result = await this.studentCourseService.retrieveStudentCourseById(req.params.studentCourseId);
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

module.exports = Student_courseMiddleware;
