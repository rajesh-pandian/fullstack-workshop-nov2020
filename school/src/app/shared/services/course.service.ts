import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Course} from "../models/course.model";

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
