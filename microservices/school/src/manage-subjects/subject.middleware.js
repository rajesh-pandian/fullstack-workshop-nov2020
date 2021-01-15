const SubjectService = require('./subject.service');

class SubjectMiddleware {
    constructor() {
        this.subjectService = new SubjectService();
    }

    validateCreate= async (req, res, next) =>  {
        const subjectDetails = req.body

        let errorList = [];
        let isError = false;

        if (!subjectDetails.description || subjectDetails.description.trim() === '') {
            isError = true;
            errorList.push('Description cannot be Empty')
        }

        const result = await this.subjectService.retrieveSubjectByDescription(subjectDetails.description);
        if (result && result.length !== 0 ) {
            isError = true;
            errorList.push('Subject already exists')
        }

        if (isError) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    validateUpdate= async (req, res, next) =>  {
        const subjectDetails = req.body;
        let errorList = [];
        let isError = false;

        const result = await this.subjectService.retrieveSubjectById(subjectDetails.id);
        if (result && result.length === 0) {
            isError = true;
            errorList.push('Id is invalid')
        }

        if (!subjectDetails.description || subjectDetails.description.trim() === '') {
            isError = true;
            errorList.push('Description cannot be Empty')
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

        const result = await this.subjectService.retrieveSubjectById(req.params.subjectId);
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

module.exports = SubjectMiddleware;
