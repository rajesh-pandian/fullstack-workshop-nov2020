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

    SELECT_TEACHER_FILTERED_LASTNAME_ASC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM teacher
        WHERE last_name like ?
        ORDER BY last_name asc
        LIMIT ?, ?;
    `;

    SELECT_TEACHER_FILTERED_LASTNAME_DESC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM teacher
        WHERE last_name like ?
        ORDER BY last_name desc
        LIMIT ?, ?;
    `;

    SELECT_TEACHER_FILTERED_FIRSTNAME_ASC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM teacher
        WHERE last_name like ?
        ORDER BY first_name asc
        LIMIT ?, ?;
    `;

    SELECT_TEACHER_FILTERED_FIRSTNAME_DESC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM teacher
        WHERE last_name like ?
        ORDER BY first_name desc
        LIMIT ?, ?;
    `;

    SELECT_TEACHER_FILTERED_ID_ASC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM teacher
        WHERE last_name like ?
        ORDER BY id asc
        LIMIT ?, ?;
    `;

    SELECT_TEACHER_FILTERED_ID_DESC = `
        SELECT
          id, 
          first_name as firstName, 
          last_name as lastName
        FROM teacher
        WHERE last_name like ?
        ORDER BY id desc
        LIMIT ?, ?;
    `;

    SELECT_TEACHER_BY_ID = `
        SELECT first_name, last_name FROM teacher where id = ?;
    `;

    COUNT_TEACHERS = `SELECT
            COUNT(*) as count,
            teacher.last_name
            FROM teacher
            where teacher.last_name like ?
            
            ;`;

    constructor() {
        this.databaseService = new DatabaseService();
    }

    async countTeachers(filter) {
        try {
            const result = await this.databaseService.query(this.COUNT_TEACHERS, [`%${filter}%`] );
            let { count } = result[0];
            return count;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async createTeacher({ firstName, lastName }) {
        try {
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

    async retrieveTeachersFiltered( {filter, sortField, sortOrder, pageIndex, pageSize } ) {
        try {

            const startItem = +(pageIndex * pageSize);
            const pageSz = parseInt(pageSize, 10);

            let queryString = this.SELECT_TEACHER_FILTERED_LASTNAME_ASC;

            if (sortField === 'lastName') {
                if (sortOrder === 'desc') {
                    queryString = this.SELECT_TEACHER_FILTERED_LASTNAME_DESC;
                }
            } else if (sortField === 'firstName') {
                queryString = this.SELECT_TEACHER_FILTERED_FIRSTNAME_ASC
                if (sortOrder === 'desc') {
                    queryString = this.SELECT_TEACHER_FILTERED_FIRSTNAME_DESC
                }
            } else {
                queryString = this.SELECT_TEACHER_FILTERED_ID_ASC;
                if (sortOrder === 'desc') {
                    queryString = this.SELECT_TEACHER_FILTERED_ID_DESC;
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
