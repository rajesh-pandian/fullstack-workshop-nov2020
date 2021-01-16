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

    SELECT_STUDENT_FILTERED_LASTNAME_ASC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM student
        WHERE last_name like ?
        ORDER BY last_name asc
        LIMIT ?, ?;
    `;

    SELECT_STUDENT_FILTERED_LASTNAME_DESC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM student
        WHERE last_name like ?
        ORDER BY last_name desc
        LIMIT ?, ?;
    `;

    SELECT_STUDENT_FILTERED_FIRSTNAME_ASC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM student
        WHERE last_name like ?
        ORDER BY first_name asc
        LIMIT ?, ?;
    `;

    SELECT_STUDENT_FILTERED_FIRSTNAME_DESC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM student
        WHERE last_name like ?
        ORDER BY first_name desc
        LIMIT ?, ?;
    `;

    SELECT_STUDENT_FILTERED_ID_ASC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM student
        WHERE last_name like ?
        ORDER BY id asc
        LIMIT ?, ?;
    `;

    SELECT_STUDENT_FILTERED_ID_DESC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM student
        WHERE last_name like ?
        ORDER BY id desc
        LIMIT ?, ?;
    `;

    SELECT_STUDENT_BY_ID = `
        SELECT first_name, last_name FROM student where id = ?;
    `;

    COUNT_STUDENTS = `SELECT
            COUNT(*) as count,
            student.last_name
            FROM student
            where student.last_name like ?
            
            ;`;

    constructor() {
        this.databaseService = new DatabaseService();
    }

    async countStudents(filter) {
        try {
            const result = await this.databaseService.query(this.COUNT_STUDENTS, [`%${filter}%`] );
            let { count } = result[0];
            return count;
        } catch (error) {
            console.error(error);
            throw error;
        }
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

    async retrieveStudentsFiltered( {filter, sortField, sortOrder, pageIndex, pageSize } ) {
        try {

            const startItem = +(pageIndex * pageSize);
            const pageSz = parseInt(pageSize, 10);

            let queryString = this.SELECT_STUDENT_FILTERED_LASTNAME_ASC;

            if (sortField === 'lastName') {
                if (sortOrder === 'desc') {
                    queryString = this.SELECT_STUDENT_FILTERED_LASTNAME_DESC;
                }
            } else if (sortField === 'firstName') {
                queryString = this.SELECT_STUDENT_FILTERED_FIRSTNAME_ASC
                if (sortOrder === 'desc') {
                    queryString = this.SELECT_STUDENT_FILTERED_FIRSTNAME_DESC
                }
            } else {
                queryString = this.SELECT_STUDENT_FILTERED_ID_ASC;
                if (sortOrder === 'desc') {
                    queryString = this.SELECT_STUDENT_FILTERED_ID_DESC;
                }
            }

            const result = await this.databaseService.query(queryString,
                [ `%${filter}%`, startItem,  pageSz ]);


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
