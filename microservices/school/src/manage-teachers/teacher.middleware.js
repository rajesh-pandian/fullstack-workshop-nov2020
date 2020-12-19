const TeacherService = require('./teacher.service');

class TeacherMiddleware {
    constructor() {
        this.teacherService = new TeacherService();
    }

    validateCreate= async (req, res, next) =>  {
        const teacherDetails = req.body
        let errorList = [];
        let isError = false;
        if (!teacherDetails.firstName || teacherDetails.firstName.trim() === '') {
            isError = true;
            errorList.push('First Name cannot be Empty')
        }

        if (!teacherDetails.lastName || teacherDetails.lastName.trim() === '') {
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
        const teacherDetails = req.body;
        let errorList = [];
        let isError = false;
        
        const result = await this.teacherService.retrieveTeacherById(req.params.teacherId);
        if (result && result.length === 0) {
            isError = true;
            errorList.push('Id is invalid')
        }

        if (!teacherDetails.firstName || teacherDetails.firstName.trim() === '') {
            isError = true;
            errorList.push('First Name cannot be Empty')
        }

        if (!teacherDetails.lastName || teacherDetails.lastName.trim() === '') {
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
        const productDetails = req.body;
        let errorList = [];
        let isError = false;
        
        const result = await this.teacherService.retrieveTeacherById(req.params.teacherId);
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

module.exports = TeacherMiddleware;
