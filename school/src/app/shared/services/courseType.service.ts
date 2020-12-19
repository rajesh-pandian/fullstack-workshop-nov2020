import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {CourseType} from "../models/courseType.model";


@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {

  api = 'http://localhost:5000/fullstack/courseTypes';

  constructor(private http: HttpClient) {

  }

  getCourseTypes() {
    return this.http
      .get(`${this.api}/all`)
      .pipe(catchError(this.handleError));
  }

  createCourseType(courseType: CourseType) {
    return this.http
      .post(`${this.api}/create`, courseType)
      .pipe(catchError(this.handleError));
  }

  deleteCourseType(id: number) {
    return this.http
      .delete(`${this.api}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateCourseType(courseType: CourseType) {
    return this.http
      .put(`${this.api}/update/${courseType.id}`, courseType)
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
