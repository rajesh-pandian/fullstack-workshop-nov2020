import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Teacher} from "../models/teacher.model";
import {Student} from "../models/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  api = '/api/fullstack/student';

  constructor(private http: HttpClient) {

  }


  getStudents() {
    return this.http
      .get(`${this.api}/all`)
      .pipe(catchError(this.handleError));
  }

  createStudent(student: Student) {
    return this.http
      .post(`${this.api}/create`, student)
      .pipe(catchError(this.handleError));
  }

  deleteStudent(id: number) {
    return this.http
      .delete(`${this.api}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateStudent(student: Student) {
    return this.http
      .put(`${this.api}/update/${student.id}`, student)
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
