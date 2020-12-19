const StudentService = require('./student.service');

class StudentMiddleware {
    constructor() {
        this.studentService = new StudentService();
    }

    validateCreate= async (req, res, next) =>  {
        const studentDetails = req.body

        let errorList = [];
        let isError = false;
        if (!studentDetails.firstName || studentDetails.firstName.trim() === '') {
            isError = true;
            errorList.push('First Name cannot be Empty')
        }

        if (!studentDetails.lastName || studentDetails.lastName.trim() === '') {
            isError = true;
            errorList.push('Last Name cannot be Empty')
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

        if (!studentDetails.firstName || studentDetails.firstName.trim() === '') {
            isError = true;
            errorList.push('First Name cannot be Empty')
        }

        if (!studentDetails.lastName || studentDetails.lastName.trim() === '') {
            isError = true;
            errorList.push('Last Name cannot be Empty')
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

module.exports = StudentMiddleware;
