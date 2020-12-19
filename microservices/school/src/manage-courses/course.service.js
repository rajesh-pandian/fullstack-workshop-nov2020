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
