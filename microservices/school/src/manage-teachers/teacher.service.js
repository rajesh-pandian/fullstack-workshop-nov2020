const DatabaseService = require('../database/database.service');

class TeacherService {
    INSERT_TEACHER = `
        INSERT INTO teacher (first_name, last_name) VALUES(?,?);
    `;

    UPDATE_TEACHER = `
        UPDATE teacher SET first_name = ?, last_name = ? WHERE id = ?;
    `;

    DELETE_TEACHER = `
        DELETE FROM teacher where id = ?;
    `;

    SELECT_ALL_TEACHER = `
        SELECT id, first_name as firstName, last_name as lastName FROM teacher ORDER BY lastName;
    `;

    SELECT_TEACHER = `
        SELECT id, first_name, last_name FROM teacher where last_name like ?;
    `;

    SELECT_TEACHER_BY_ID = `
        SELECT first_name, last_name FROM teacher where id = ?;
    `;

    constructor() {
        this.databaseService = new DatabaseService();
    }

    async createTeacher({ firstName, lastName }) {
        try {
            console.log('in teacher service, createTeacher, params are ', firstName, lastName);
            const { insertId } = await this.databaseService.query(this.INSERT_TEACHER,
                [ firstName, lastName ]);
      
            // Return just the insertId
            return insertId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async updateTeacher({ firstName, lastName }, teacherId) {
        try {
            // Insert into Products
            const { updateId } = await this.databaseService.query(this.UPDATE_TEACHER,
                [ firstName, lastName, teacherId ]);
      
            return updateId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async deleteTeacher(teacherId) {
        try {
            // Insert into Products
            const { deleteId } = await this.databaseService.query(this.DELETE_TEACHER,
                [ teacherId ]);
      
            return deleteId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveAllTeachers() {
        try {

            const result = await this.databaseService.query(this.SELECT_ALL_TEACHER);
      
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveTeacher({ last_name }) {
        try {

            const result = await this.databaseService.query(this.SELECT_TEACHER, [ `${last_name}%` ]);
      
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveTeacherById(id) {
        try {

            const result = await this.databaseService.query(this.SELECT_TEACHER_BY_ID, [ id ]);
      
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }
}

module.exports = TeacherService;
