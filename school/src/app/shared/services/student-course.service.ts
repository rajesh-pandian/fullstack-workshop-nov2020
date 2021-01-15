import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {APIStudentCourse,  StudentCourse} from "../models/course.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {

  api = '/api/fullstack/studentCourse';

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

  getStudentCoursesFiltered(filter: string,
                            sortField: string,
                            sortDirection: string,
                            pageIndex: string,
                            pageSize: string) {

    return this.http
      .get<APIStudentCourse[]>(`${this.api}/filtered`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortField', sortField)
          .set('sortOrder', sortDirection)
          .set('pageIndex', pageIndex)
          .set('pageSize', pageSize),
        headers: new HttpHeaders()
          .set('Cache-Control', 'no-cache')
      })
      .pipe(
        map(
          (res) => res.map(r => new StudentCourse(r))
        ),
        catchError(this.handleError)
      );
  }

  countStudentCourses(filter: string): Observable<number> {
    return this.http
      .get<number>(`${this.api}/count`, {
        params: new HttpParams()
          .set('filter', filter),

        headers: new HttpHeaders()
          .set('Cache-Control', 'no-cache')

      })
      .pipe(
        catchError(this.handleError)
      );
  }


  createStudentCourse(studentCourse: StudentCourse) {
    return this.http
      .post(`${this.api}/create`, studentCourse)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteStudentCourse(id: number) {
    return this.http
      .delete(`${this.api}/delete/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateStudentCourse(studentCourse: StudentCourse) {
    return this.http
      .put(`${this.api}/update/${studentCourse.id}`, studentCourse)
      .pipe(catchError(this.handleError));
  }


  searchStudentCourseByStudentId(id: number) {
    return this.http
      .get<StudentCourse[]>(`${this.api}/searchByStudent?studentId=${id}`)
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
