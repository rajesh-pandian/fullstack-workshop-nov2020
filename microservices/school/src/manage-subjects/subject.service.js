const DatabaseService = require('../database/database.service');

class SubjectService {
    INSERT_SUBJECT = `
        INSERT INTO subject (description) VALUES(?);
    `;

    UPDATE_SUBJECT = `
        UPDATE subject SET description = ? WHERE id = ?;
    `;

    DELETE_SUBJECT = `
        DELETE FROM subject where id = ?;
    `;

    SELECT_ALL_SUBJECTS = `
        SELECT 
         id,
         description
        FROM subject 
        ORDER BY subject.description;
    `;


    SELECT_SUBJECT_FILTERED_ID_ASC = `SELECT
        id,
        description
        FROM subject 
        where description like ?
        ORDER BY id asc
        LIMIT ?, ?
        ;`;

    SELECT_SUBJECT_FILTERED_ID_DESC = `SELECT
        id,
        description
        FROM subject 
        where description like ?
        ORDER BY id desc
        LIMIT ?, ?
        ;`;

    SELECT_SUBJECT_FILTERED_DESCRIPTION_ASC = `SELECT
        id,
        description
        FROM subject 
        where description like ?
        ORDER BY description asc
        LIMIT ?, ?
        ;`;

    SELECT_SUBJECT_FILTERED_DESCRIPTION_DESC = `SELECT
        id,
        description
        FROM subject 
        where description like ?
        ORDER BY description desc
        LIMIT ?, ?
        ;`;

    COUNT_SUBJECTS = `SELECT
            COUNT(*) as count,
            description
            FROM subject 
            where description like ?
            
            ;`;


    SELECT_SUBJECT_BY_ID = `
        SELECT id, description FROM subject where id = ?;
    `;


    SELECT_SUBJECT_BY_DESCRIPTION = `
        SELECT id, description FROM subject where description = ?;
    `;

    constructor() {
        this.databaseService = new DatabaseService();
    }

    async createSubject({ description }) {
        try {
            console.log('in student_course service, createSubject, params are ', description);
            const { insertId } = await this.databaseService.query(this.INSERT_SUBJECT,
                [ description ]);

            // Return just the insertId
            return insertId;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateSubject({ description }, subjectId) {
        try {

            const { updateId } = await this.databaseService.query(this.UPDATE_SUBJECT,
                [ description, subjectId ]);

            return updateId;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteSubject(subjectId) {
        try {

            const { deleteId } = await this.databaseService.query(this.DELETE_SUBJECT,
                [ subjectId ]);

            return deleteId;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async retrieveAllSubjects() {
        try {
            const result = await this.databaseService.query(this.SELECT_ALL_SUBJECTS);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async retrieveSubjectsFiltered( {filter, sortField, sortOrder, pageIndex, pageSize } ) {
        try {

            const startItem = +(pageIndex * pageSize);
            const pageSz = parseInt(pageSize, 10);

            let queryString = this.SELECT_SUBJECT_FILTERED_ID_DESC;

            if (sortField === 'id') {
                if (sortOrder === 'asc') {
                    queryString = this.SELECT_SUBJECT_FILTERED_ID_ASC;
                }
            } else {
                queryString = this.SELECT_SUBJECT_FILTERED_DESCRIPTION_DESC
                if (sortOrder === 'asc') {
                    queryString = this.SELECT_SUBJECT_FILTERED_DESCRIPTION_ASC
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

    async countSubjects({filter}) {
        try {
            const result = await this.databaseService.query(this.COUNT_SUBJECTS, [`%${filter}%`] );
            let { count } = result[0];
            return count;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async retrieveSubjectById(id) {
        try {

            const result = await this.databaseService.query(this.SELECT_SUBJECT_BY_ID, [ id ]);

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async retrieveSubjectByDescription(description) {
        try {

            const result = await this.databaseService.query(this.SELECT_SUBJECT_BY_DESCRIPTION, [ description ]);

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }



}

module.exports = SubjectService;
