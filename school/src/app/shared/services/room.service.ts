import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Room} from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  api = 'http://localhost:5000/fullstack/room';

  constructor(private http: HttpClient) {

  }

  getRooms() {
    return this.http
      .get(`${this.api}/all`)
      .pipe(catchError(this.handleError));
  }


  createRoom(room: Room) {
    return this.http
      .post(`${this.api}/create`, room)
      .pipe(catchError(this.handleError));
  }

  deleteRoom(id: number) {
    return this.http
      .delete(`${this.api}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }


  updateRoom(room: Room) {
    return this.http
      .put(`${this.api}/update/${room.id}`, room)
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
