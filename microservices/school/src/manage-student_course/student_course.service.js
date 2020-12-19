const DatabaseService = require('../database/database.service');

class StudentCourseService {
    INSERT_STUDENT_COURSE = `
        INSERT INTO student_course (student_id, course_id) VALUES(?,?);
    `;

    UPDATE_STUDENT_COURSE = `
        UPDATE student_course SET student_id = ?, course_id = ? WHERE id = ?;
    `;

    DELETE_STUDENT_COURSE = `
        DELETE FROM student_course where id = ?;
    `;

    SELECT_ALL_STUDENT_COURSE = `
        SELECT 
               sc.id,
               sc.course_id,
               sc.student_id,
               course.name,
               student.first_name as studentFirstName,
               student.last_name as studentLastName
        FROM student_course as sc
        JOIN course
           ON course.id = sc.course_id        
        JOIN student
           ON sc.student_id = student.id
        ORDER BY course.name
    `;


    SELECT_STUDENT_COURSE_BY_STUDENT_ID = `
        SELECT id, student_id, course_id FROM student_course where student_id = ?;
    `;


    SELECT_STUDENT_COURSE_BY_COURSE_ID = `
        SELECT id, student_id, course_id FROM student_course where course_id = ?;
    `;

    SELECT_STUDENT_COURSE_BY_ID = `
        SELECT student_id, course_id FROM student_course where id = ?;
    `;

    constructor() {
        this.databaseService = new DatabaseService();
    }

    async createStudentCourse({ studentId, courseId }) {
        try {
            console.log('in student_course service, createStudent_course, params are ', studentId, courseId);
            const { insertId } = await this.databaseService.query(this.INSERT_STUDENT_COURSE,
                [ studentId, courseId ]);
      
            // Return just the insertId
            return insertId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async updateStudentCourse({ studentId, courseId }, student_course_Id) {
        try {
            // Insert into Products
            const { updateId } = await this.databaseService.query(this.UPDATE_STUDENT_COURSE,
                [ studentId, courseId, student_course_Id ]);
      
            return updateId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async deleteStudentCourse(student_course_Id) {
        try {
            // Insert into Products
            const { deleteId } = await this.databaseService.query(this.DELETE_STUDENT_COURSE,
                [ student_course_Id ]);
      
            return deleteId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveAllStudentCourses() {
        try {

            const result = await this.databaseService.query(this.SELECT_ALL_STUDENT_COURSE);
      
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveStudentCoursesByStudentId({ student_id }) {
        try {

            const result = await this.databaseService.query(this.SELECT_STUDENT_COURSE_BY_STUDENT_ID, [ `${student_id}%` ]);
      
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }


    async retrieveStudentCoursesByCourseId({ course_id }) {
        try {

            const result = await this.databaseService.query(this.SELECT_STUDENT_COURSE_BY_COURSE_ID, [ `${course_id}%` ]);

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async retrieveStudentCourseById(id) {
        try {

            const result = await this.databaseService.query(this.SELECT_STUDENT_COURSE_BY_ID, [ id ]);
      
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }
}

module.exports = StudentCourseService;
