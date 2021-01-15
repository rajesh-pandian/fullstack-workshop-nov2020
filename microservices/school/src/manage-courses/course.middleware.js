const CourseService = require('./course.service');

class CourseMiddleware {
    constructor() {
        this.courseService = new CourseService();
    }

    validateCreate= async (req, res, next) =>  {
        const courseDetails = req.body
        let errorList = [];
        let isError = false;
        if (!courseDetails.name || courseDetails.name.trim() === '') {
            isError = true;
            errorList.push('Name cannot be Empty')
        }

        if (!courseDetails.description || courseDetails.description.trim() === '') {
            isError = true;
            errorList.push('Description cannot be Empty')
        }

        if(!courseDetails.teacherId || courseDetails.teacherId < 0) {
            isError = true;
            errorList.push('teacher Id cannot be undefined or less than 0')
        } else {
            const result = await this.courseService.retrieveTeacherById(courseDetails.teacherId);
            if (result && result.length === 0) {
                isError = true;
                errorList.push('Teacher Id is invalid')
            }
        }

        if(!courseDetails.roomId || courseDetails.roomId < 0) {
            isError = true;
            errorList.push('room Id cannot be undefined or less than 0')
        } else {
            const result = await this.courseService.retrieveRoomById(courseDetails.roomId);
            if (result && result.length === 0) {
                isError = true;
                errorList.push('Room Id is invalid')
            }
        }

        if (isError) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    validateUpdate= async (req, res, next) =>  {
        const courseDetails = req.body;
        let errorList = [];
        let isError = false;
        
        const result = await this.courseService.retrieveCourseById(req.params.courseId);
        if (result && result.length === 0) {
            isError = true;
            errorList.push('Id is invalid')
        }

        if (!courseDetails.name || courseDetails.name.trim() === '') {
            isError = true;
            errorList.push('Name cannot be Empty')
        }

        if (!courseDetails.description || courseDetails.description.trim() === '') {
            isError = true;
            errorList.push('Description cannot be Empty')
        }

        if(!courseDetails.teacherId || courseDetails.teacherId < 0) {
            isError = true;
            errorList.push('Teacher Id cannot be undefined or less than 0')
        } else {
            const result = await this.courseService.retrieveTeacherById(courseDetails.teacherId);
            if (result && result.length === 0) {
                isError = true;
                errorList.push('Teacher Id is invalid')
            }
        }

        if(!courseDetails.roomId || courseDetails.roomId < 0) {
            isError = true;
            errorList.push('room Id cannot be undefined or less than 0')
        } else {
            const result = await this.courseService.retrieveRoomById(courseDetails.roomId);
            if (result && result.length === 0) {
                isError = true;
                errorList.push('Room Id is invalid')
            }
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
        
        const result = await this.courseService.retrieveCourseById(req.params.courseId);
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

module.exports = CourseMiddleware;
