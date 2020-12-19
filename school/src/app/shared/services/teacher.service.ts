import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Teacher} from "../models/teacher.model";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  api = 'http://localhost:5000/fullstack/teacher';

  constructor(private http: HttpClient) {

  }


  getTeachers(): Observable<Teacher[]> {
    return this.http
      .get<Teacher[]>(`${this.api}/all`)
      .pipe(catchError(this.handleError));
  }

  createTeacher(teacher: Teacher) {
    console.log('in create teacher xxxx ', teacher);
    return this.http
      .post(`${this.api}/create`, teacher)
      .pipe(catchError(this.handleError));
  }

  deleteTeacher(teacher: Teacher) {
    console.log('in delete teacher xxxx');
    return this.http
      .delete(`${this.api}/delete/${teacher.id}`)
      .pipe(catchError(this.handleError));
  }

  updateTeacher(teacher: Teacher) {
    console.log('in updateteacher xxxx');
    return this.http
      .put(`${this.api}/update/${teacher.id}`, teacher)
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
