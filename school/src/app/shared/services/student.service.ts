import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Student} from "../models/student.model";
import {Subject} from "../models/subject.model";
import {Observable} from "rxjs";

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


  getStudentsFiltered(filter: string,
                      sortField: string,
                      sortDirection: string,
                      pageIndex: string,
                      pageSize: string) {

    return this.http
      .get<Subject[]>(`${this.api}/filtered`, {
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

  countStudents(filter: string): Observable<number> {
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
