import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Teacher} from "../models/teacher.model";
import {APIStudentCourse, StudentCourse} from "../models/course.model";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  api = '/api/fullstack/teacher';

  constructor(private http: HttpClient) {

  }


  getTeachers(): Observable<Teacher[]> {
    return this.http
      .get<Teacher[]>(`${this.api}/all`)
      .pipe(catchError(this.handleError));
  }

  getTeachersFiltered(filter: string,
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
        catchError(this.handleError)
      );
  }


  countTeachers(filter: string): Observable<number> {
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


  createTeacher(teacher: Teacher) {
    return this.http
      .post(`${this.api}/create`, teacher)
      .pipe(catchError(this.handleError));
  }

  deleteTeacher(teacherId: number) {
    return this.http
      .delete(`${this.api}/delete/${teacherId}`)
      .pipe(catchError(this.handleError));
  }

  updateTeacher(teacher: Teacher) {
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
