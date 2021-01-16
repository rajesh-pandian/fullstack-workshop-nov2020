const StudentService = require('./student.service');

class StudentController {
    constructor() {
        this.studentService = new StudentService();
    }

    createStudent= async (req, res) => {
        try {
            const studentDetails = req.body;
            await this.studentService.createStudent(studentDetails);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error creating Student' });
        }
    } 

    updateStudent= async (req, res) => {
        try {
            const studentId = req.params.studentId
            const studentDetails = req.body;
            await this.studentService.updateStudent(studentDetails, studentId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating Teachers' });
        }
    } 

    deleteStudent= async (req, res) => {
        try {
            const studentId = req.params.studentId
            await this.studentService.deleteStudent(studentId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating Products' });
        }
    } 

    retrieveAllStudents= async (req, res) => {
        try {
            const studentDetails = req.body;
            const result = await this.studentService.retrieveAllStudents(studentDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieve all Teachers' });
        }
    } 

    retrieveStudent= async (req, res) => {
        try {
            const studentDetails = req.query;
            console.log('student details are ', studentDetails);
            const result = await this.studentService.retrieveStudent(studentDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieve Student' });
        }
    }

    retrieveStudentsFiltered= async (req, res) => {
        try {
            const result = await this.studentService.retrieveStudentsFiltered(req.query);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving filtered Students' });
        }
    }

    countStudents= async (req, res) => {
        try {
            const result = await this.studentService.countStudents(req.query.filter);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving count of filtered Students' });
        }
    }

}

module.exports = StudentController;
