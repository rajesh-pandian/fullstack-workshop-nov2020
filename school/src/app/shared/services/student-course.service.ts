import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {APIStudentCourse,  StudentCourse} from "../models/course.model";

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {

  api = 'http://localhost:5000/fullstack/studentCourse';

  constructor(private http: HttpClient) {

  }


  getStudentCourses() {
    return this.http
      .get<APIStudentCourse[]>(`${this.api}/all`)
      .pipe(
        map(
          (res) => res.map(r => new StudentCourse(r))
        ),
        catchError(this.handleError)
      );
  }

  createStudentCourse(studentCourse: StudentCourse) {
    return this.http
      .post(`${this.api}/create`, studentCourse)
      .pipe(catchError(this.handleError));
  }

  deleteStudentCourse(id: number) {
    return this.http
      .delete(`${this.api}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateStudentCourse(studentCourse: StudentCourse) {
    return this.http
      .put(`${this.api}/update/${studentCourse.id}`, studentCourse)
      .pipe(catchError(this.handleError));
  }


  searchStudentCourseByStudentId(id: number) {
    return this.http
      .get<StudentCourse[]>(`${this.api}/searchByStudent?student_id=${id}`)
      .pipe(catchError(this.handleError));
  }

  searchStudentCourseByCourseId(id: number) {
    return this.http
      .get<StudentCourse[]>(`${this.api}/searchByCourse?course_id=${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
