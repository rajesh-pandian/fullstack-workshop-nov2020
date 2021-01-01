import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {CourseResolved, Course} from "../models/course.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  api = 'http://localhost:5000/fullstack/course';

  constructor(private http: HttpClient) {

  }

  getCourses() {
    return this.http
      .get(`${this.api}/allResolved`)
      .pipe(catchError(this.handleError));
  }


  getCoursesFiltered(filter: string,
                            sortField: string,
                            sortDirection: string,
                            pageIndex: string,
                            pageSize: string) {

    return this.http
      .get<CourseResolved[]>(`${this.api}/filtered`, {
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
         catchError(this.handleError)
      );
  }


  countCourses(filter: string): Observable<number> {
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

  getCoursesForTeacher(id) {
    return this.http
      .get(`${this.api}/withTeacher?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  getCoursesForRoom(id) {
    return this.http
      .get(`${this.api}/usingRoom?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  createCourse(course: Course) {
    return this.http
      .post(`${this.api}/create`, course)
      .pipe(catchError(this.handleError));
  }

  deleteCourse(id: number) {
    return this.http
      .delete(`${this.api}/delete/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCourse(course: Course) {
    return this.http
      .put(`${this.api}/update/${course.id}`, course)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      alert(`Error: ${error.status},  ${error.statusText}`);
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
