const DatabaseService = require('../database/database.service');

class StudentService {
    INSERT_STUDENT = `
        INSERT INTO student (first_name, last_name) VALUES(?,?);
    `;

    UPDATE_STUDENT = `
        UPDATE student SET first_name = ?, last_name = ? WHERE id = ?;
    `;

    DELETE_STUDENT = `
        DELETE FROM student where id = ?;
    `;

    SELECT_ALL_STUDENT = `
        SELECT id, first_name as firstName, last_name as lastName FROM student ORDER BY last_name;
    `;

    SELECT_STUDENT = `
        SELECT id, first_name, last_name FROM student where last_name like ?;
    `;

    SELECT_STUDENT_BY_ID = `
        SELECT first_name, last_name FROM student where id = ?;
    `;

    constructor() {
        this.databaseService = new DatabaseService();
    }

    async createStudent({ firstName, lastName }) {
        try {
            const { insertId } = await this.databaseService.query(this.INSERT_STUDENT,
                [ firstName, lastName ]);
            return insertId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async updateStudent({ firstName, lastName }, studentId) {
        try {
            const { updateId } = await this.databaseService.query(this.UPDATE_STUDENT,
                [ firstName, lastName, studentId ]);
            return updateId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async deleteStudent(studentId) {
        try {
            const { deleteId } = await this.databaseService.query(this.DELETE_STUDENT,
                [ studentId ]);
            return deleteId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveAllStudents() {
        try {
            const result = await this.databaseService.query(this.SELECT_ALL_STUDENT);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveStudent({ last_name }) {
        try {
            const result = await this.databaseService.query(this.SELECT_STUDENT, [ `${last_name}%` ]);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveStudentById(id) {
        try {
            const result = await this.databaseService.query(this.SELECT_STUDENT_BY_ID, [ id ]);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }
}

module.exports = StudentService;
