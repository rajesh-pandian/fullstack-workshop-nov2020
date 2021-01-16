const SubjectService = require('./subject.service');

class SubjectController {
    constructor() {
        this.subjectService = new SubjectService();
    }

    createSubject= async (req, res) => {
        try {
            const subjectDetails = req.body;
            await this.subjectService.createSubject(subjectDetails);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error creating Subject' });
        }
    }

    updateSubject= async (req, res) => {
        try {
            const subjectId = req.params.subjectId
            const subjectDetails = req.body;
            await this.subjectService.updateSubject(subjectDetails, subjectId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating Subject' });
        }
    }

    deleteSubject= async (req, res) => {
        try {
            const subjectId = req.params.subjectId
            await this.subjectService.deleteSubject(subjectId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating Subject' });
        }
    }

    retrieveAllSubjects= async (req, res) => {
        try {
            const result = await this.subjectService.retrieveAllSubjects();
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving all Subjects' });
        }
    }


    retrieveSubjectsFiltered= async (req, res) => {
        try {
            const subjectQuery = req.query;
            const result = await this.subjectService.retrieveSubjectsFiltered(subjectQuery);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving filtered Subjects' });
        }
    }

    countSubjects= async (req, res) => {
        try {
            const subjectQuery = req.query;
            const result = await this.subjectService.countSubjects(subjectQuery);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving count of filtered Subjects' });
        }
    }

}

module.exports = SubjectController;
