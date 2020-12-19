const TeacherService = require('./teacher.service');

class TeacherController {
    constructor() {
        this.teacherService = new TeacherService();
    }

    createTeacher= async (req, res) => {
        try {
            const teacherDetails = req.body;
            await this.teacherService.createTeacher(teacherDetails);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error creating Teachers' });
        }
    } 

    updateTeacher= async (req, res) => {
        console.log('in update teacher');
        try {
            const teacherId = req.params.teacherId
            const teacherDetails = req.body;
            await this.teacherService.updateTeacher(teacherDetails, teacherId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating teacher' });
        }
    } 

    deleteTeacher= async (req, res) => {
        try {
            const teacherId = req.params.teacherId
            await this.teacherService.deleteTeacher(teacherId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating teacher' });
        }
    } 

    retrieveAllTeachers= async (req, res) => {
        try {
            const result = await this.teacherService.retrieveAllTeachers();
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving all Teachers' });
        }
    } 

    retrieveTeacher= async (req, res) => {
        try {
            const teacherDetails = req.query;
            console.log('teacher details are ', teacherDetails);
            const result = await this.teacherService.retrieveTeacher(teacherDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving teacher' });
        }
    } 
}

module.exports = TeacherController;
