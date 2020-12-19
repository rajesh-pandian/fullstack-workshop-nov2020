const DatabaseService = require('../database/database.service');

class Course_typeService {
    INSERT_COURSE_TYPE = `
        INSERT INTO subject (description) VALUES(?);
    `;

    UPDATE_COURSE_TYPE = `
        UPDATE subject SET description = ? WHERE id = ?;
    `;

    DELETE_COURSE_TYPE = `
        DELETE FROM subject where id = ?;
    `;

    SELECT_ALL_COURSE_TYPE = `
        SELECT id, description FROM subject;
    `;

    SELECT_COURSE_TYPE = `
        SELECT id, description FROM subject where description like ?;
    `;

    SELECT_COURSE_TYPE_BY_ID = `
        SELECT description FROM subject where id = ?;
    `;

    constructor() {
        this.databaseService = new DatabaseService();
    }

    async createCourseType({ description }) {
        try {
            const { insertId } = await this.databaseService.query(this.INSERT_COURSE_TYPE,
                [ description ]);
            return insertId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async updateCourseType({ description }, course_typeId) {
        try {
            const { updateId } = await this.databaseService.query(this.UPDATE_COURSE_TYPE,
                [ description, course_typeId ]);
      
            return updateId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async deleteCourseType(courseTypeId) {
        try {
            const { deleteId } = await this.databaseService.query(this.DELETE_COURSE_TYPE,
                [ courseTypeId ]);
      
            return deleteId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveAllCourseTypes() {
        try {
            const result = await this.databaseService.query(this.SELECT_ALL_COURSE_TYPE);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveCourseType({ description }) {
        try {
            const result = await this.databaseService.query(this.SELECT_COURSE_TYPE, [ `${description}%` ]);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveCourseTypeById(id) {
        try {
            const result = await this.databaseService.query(this.SELECT_COURSE_TYPE_BY_ID, [ id ]);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }
}

module.exports = Course_typeService;
