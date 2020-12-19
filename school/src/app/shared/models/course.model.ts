export interface  Course  {
  id: number;
  name: string;
  subjectId: number;
  description: string;
  teacherId: number;
  roomId: number;
}


export interface  CourseResolved  {
  id: number;
  name: string;
  subjectId: number;
  description: string;
  teacherId: number;
  roomId: number;
  teacherFirstName: string;
  teacherLastName: string;
  studentFirstName: string;
  studentLastName: string;
  roomName: string;
  capacity: number;
}

export class  StudentCourse  {
  id: number;
  name: string;
  courseId: number;
  studentId: number;
  studentFirstName: string;
  studentLastName: string;

  constructor(apiData: APIStudentCourse) {

    this.id = apiData.id;
    this.name = apiData.name;
    this.courseId = apiData.course_id;
    this.studentId = apiData.student_id;
    this.studentFirstName = apiData.studentFirstName;
    this.studentLastName  = apiData.studentLastName;
  }

}


export interface  APIStudentCourse {
  course_id: number;
  id: number;
  name: string;
  studentFirstName: string;
  studentLastName: string;
  student_id: number;
}

