const DatabaseService = require('../database/database.service');

class CourseService {


    SELECT_ALL_COURSE_RESOLVED = `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id   
        ORDER BY course.name;
    `;

    SELECT_COURSE_FILTERED_NAME_DESC = `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id   
        where course.name like ?
        ORDER BY course.name desc
        LIMIT ?, ?
        ;
    `;


    SELECT_COURSE_FILTERED_NAME_ASC = `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id   
        where course.name like ?
        ORDER BY course.name asc
        LIMIT ?, ?
        ;
    `;

    SELECT_COURSE_FILTERED_DESCRIPTION_DESC =  `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id   
        where course.name like ?
        ORDER BY course.description desc
        LIMIT ?, ?
        ;
    `;

    SELECT_COURSE_FILTERED_DESCRIPTION_ASC =  `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id   
        where course.name like ?
        ORDER BY course.description asc
        LIMIT ?, ?
        ;
    `;



    SELECT_COURSE_FILTERED_ROOM_DESC =  `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id   
        where course.name like ?
        ORDER BY roomName desc
        LIMIT ?, ?
        ;
    `;

    SELECT_COURSE_FILTERED_ROOM_ASC =  `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id   
        where course.name like ?
        ORDER BY roomName asc
        LIMIT ?, ?
        ;
    `;

    SELECT_COURSE_FILTERED_TEACHER_DESC =  `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id   
        where course.name like ?
        ORDER BY teacherLastName desc
        LIMIT ?, ?
        ;
    `;

    SELECT_COURSE_FILTERED_TEACHER_ASC =  `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id   
        where course.name like ?
        ORDER BY teacherLastName asc
        LIMIT ?, ?
        ;
    `;

    SELECT_COURSE_FILTERED_ID_DESC =  `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id   
        where course.name like ?
        ORDER BY course.id desc
        LIMIT ?, ?
        ;
    `;

    SELECT_COURSE_FILTERED_ID_ASC =  `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id   
        where course.name like ?
        ORDER BY course.id asc
        LIMIT ?, ?
        ;
    `;

    COUNT_COURSES = `SELECT
            COUNT(*) as count,
            course.name
            FROM course
            where course.name like ?
            
            ;`;


    SELECT_ALL_COURSE_FOR_TEACHER = `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id
        WHERE course.teacher_id = ?      
        ORDER BY course.name;
    `;


    SELECT_ALL_COURSE_FOR_ROOM = `
        SELECT course.name,
               course.id, 
               course.description,
               course.room_id as roomId,
               course.teacher_id as teacherId,
               course.subject_id as subjectId,  
               teacher.first_name as teacherFirstName,
               teacher.last_name as teacherLastName,
               room.name as roomName,
               room.capacity
        FROM course
        JOIN teacher
           ON course.teacher_id = teacher.id
        JOIN room
           ON course.room_id = room.id
        WHERE course.room_id = ?      
        ORDER BY course.name;
    `;




    INSERT_COURSE = `
        INSERT INTO course (name, subject_id, description, teacher_id, room_id) VALUES(?,?,?,?,?);
    `;

    UPDATE_COURSE = `
        UPDATE course SET name = ?, subject_id = ?, description = ?, teacher_id = ?, room_id = ? WHERE id = ?;
    `;

    DELETE_COURSE = `
        DELETE FROM course where id = ?;
    `;

    SELECT_COURSE = `
        SELECT name, subject_id, description, teacher_id, room_id FROM course where name like ?;
    `;

    SELECT_COURSE_BY_ID = `
        SELECT name, subject_id, description, teacher_id, room_id FROM course where id = ?;
    `;

    SELECT_TEACHER_BY_ID = `
        SELECT first_name, last_name FROM teacher where id = ?;
    `;

    SELECT_ROOM_BY_ID = `
        SELECT name, capacity FROM room where id = ?;
    `;

    constructor() {
        this.databaseService = new DatabaseService();
    }

    async createCourse({ name, subjectId, description, teacherId, roomId }) {
        try {
            const { insertId } = await this.databaseService.query(this.INSERT_COURSE,
                [name, subjectId, description, teacherId, roomId ]);
            return insertId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async updateCourse({name, subjectId, description, teacherId, roomId }, courseId) {
        try {
            const { updateId } = await this.databaseService.query(this.UPDATE_COURSE,
                [ name, subjectId, description, teacherId, roomId, courseId ]);
      
            return updateId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async deleteCourse(courseId) {
        try {
            const { deleteId } = await this.databaseService.query(this.DELETE_COURSE,
                [ courseId ]);
      
            return deleteId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveAllCoursesResolved() {
        try {
            const result = await this.databaseService.query(this.SELECT_ALL_COURSE_RESOLVED);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async retrieveCoursesFiltered( {filter, sortField, sortOrder, pageIndex, pageSize } ) {
        try {

            const startItem = +(pageIndex * pageSize);
            const pageSz = parseInt(pageSize, 10);

            let queryString = this.SELECT_COURSE_FILTERED_NAME_DESC;

            if (sortField === 'name') {
                if (sortOrder === 'asc') {
                    queryString = this.SELECT_COURSE_FILTERED_NAME_ASC;
                }
            } else if (sortField == 'description') {
                queryString = this.SELECT_COURSE_FILTERED_DESCRIPTION_DESC
                if (sortOrder === 'asc') {
                    queryString = this.SELECT_COURSE_FILTERED_DESCRIPTION_ASC
                }
            } else if (sortField == 'roomName') {
                queryString = this.SELECT_COURSE_FILTERED_ROOM_DESC
                if (sortOrder === 'asc') {
                    queryString = this.SELECT_COURSE_FILTERED_ROOM_ASC
                }
            } else if (sortField == 'teacherLastName') {
                queryString = this.SELECT_COURSE_FILTERED_TEACHER_DESC
                if (sortOrder === 'asc') {
                    queryString = this.SELECT_COURSE_FILTERED_TEACHER_ASC
                }
            } else if (sortField == 'id') {
                queryString = this.SELECT_COURSE_FILTERED_ID_DESC
                if (sortOrder === 'asc') {
                    queryString = this.SELECT_COURSE_FILTERED_ID_ASC
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


    async countCourses({filter}) {
        try {
            const result = await this.databaseService.query(this.COUNT_COURSES, [`%${filter}%`] );
            let { count } = result[0];
            return count;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async retrieveAllCoursesForTeacher({id}) {
        try {
            const result = await this.databaseService.query(this.SELECT_ALL_COURSE_FOR_TEACHER, [ id ]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async retrieveAllCoursesForRoom({id}) {
        try {
            const result = await this.databaseService.query(this.SELECT_ALL_COURSE_FOR_ROOM, [ id ]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }




   async retrieveCourse({ name }) {
        try {
            const result = await this.databaseService.query(this.SELECT_COURSE, [ `${name}%` ]);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveCourseById(id) {
        try {
            const result = await this.databaseService.query(this.SELECT_COURSE_BY_ID, [ id ]);
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

    async retrieveRoomById(id) {
        try {
            const result = await this.databaseService.query(this.SELECT_ROOM_BY_ID, [ id ]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = CourseService;
