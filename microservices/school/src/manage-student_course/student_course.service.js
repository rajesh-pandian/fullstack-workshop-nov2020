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


    SELECT_STUDENT_COURSE_FILTERED_NAME_ASC = `SELECT
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
            where course.name like ?
            ORDER BY name asc
            LIMIT ?, ?
            
            ;`;

    SELECT_STUDENT_COURSE_FILTERED_NAME_DESC = `SELECT
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
            where course.name like ?
            ORDER BY name desc
            LIMIT ?, ?
            
            ;`;

    SELECT_STUDENT_COURSE_FILTERED_LASTNAME_ASC = `SELECT
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
            where course.name like ?
            ORDER BY studentLastName asc
            LIMIT ?, ?
            
            ;`;

    SELECT_STUDENT_COURSE_FILTERED_LASTNAME_DESC = `SELECT
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
            where course.name like ?
            ORDER BY studentLastName desc
            LIMIT ?, ?
            
            ;`;


    COUNT_STUDENT_COURSES = `SELECT
            COUNT(*) as count,
            course.name
            FROM student_course as sc
            JOIN course
            ON course.id = sc.course_id
            where course.name like ?
            
            ;`;


    SELECT_STUDENT_COURSE_BY_STUDENT_ID = `
        SELECT id, student_id, course_id FROM student_course where student_id = ?;
    `;


    SELECT_STUDENT_COURSE_BY_COURSE_ID = `
        SELECT id, student_id, course_id FROM student_course where course_id = ?;
    `;

    SELECT_STUDENT_COURSE_BY_ID = `
        SELECT student_id, course_id FROM student_course where id = ?;
    `;


    SELECT_STUDENT_COURSE_BY_STUDENT_ID_AND_COURSE_ID = `
        SELECT id, student_id, course_id FROM student_course 
        where student_id = ? and course_id = ?;
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


    async retrieveStudentCoursesFiltered( {filter, sortField, sortOrder, pageIndex, pageSize } ) {
        try {

            const startItem = +(pageIndex * pageSize);
            const pageSz = parseInt(pageSize, 10);


            // let myStr = `SELECT
            // sc.id,
            //     sc.course_id,
            //     sc.student_id,
            //     course.name,
            //     student.first_name as studentFirstName,
            //     student.last_name as studentLastName
            // FROM student_course as sc
            // JOIN course
            // ON course.id = sc.course_id
            // JOIN student
            // ON sc.student_id = student.id
            // where course.name like '%${filter}%'
            // ORDER BY ${sortField} ${sortOrder}
            // LIMIT ${startItem}, ${pageSz}
            //
            // ;`


            let queryString = this.SELECT_STUDENT_COURSE_FILTERED_NAME_DESC;

            if (sortField === 'name') {
                if (sortOrder === 'asc') {
                    queryString = this.SELECT_STUDENT_COURSE_FILTERED_NAME_ASC;
                }
            } else {
                queryString = this.SELECT_STUDENT_COURSE_FILTERED_LASTNAME_DESC
                if (sortOrder === 'asc') {
                    queryString = this.SELECT_STUDENT_COURSE_FILTERED_LASTNAME_ASC
                }
            }

            const result = await this.databaseService.query(queryString,
                [ `%${filter}%`, startItem,  pageSz ]);

            // const result = await this.databaseService.query(myStr, [ ]);


            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async countStudentCourses({filter}) {
        try {
            const result = await this.databaseService.query(this.COUNT_STUDENT_COURSES, [`%${filter}%`] );
            let { count } = result[0];
            return count;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async retrieveStudentCoursesByStudentId({ studentId }) {
        try {
            const result = await this.databaseService.query(this.SELECT_STUDENT_COURSE_BY_STUDENT_ID, [ studentId ]);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }


    async retrieveStudentCoursesByCourseId({ course_id }) {
        try {

            const result = await this.databaseService.query(this.SELECT_STUDENT_COURSE_BY_COURSE_ID, [ course_id ]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async retrieveStudentCoursesByStudentIdAndCourseId({ studentId, courseId }) {
        try {
            const result = await this.databaseService.query(this.SELECT_STUDENT_COURSE_BY_STUDENT_ID_AND_COURSE_ID,
                [ studentId, courseId ]);
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
