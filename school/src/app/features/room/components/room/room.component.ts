import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {catchError, concatMap, tap} from "rxjs/operators";
import {RoomDetailComponent} from "../room-detail/room-detail.component";
import {MatSort} from "@angular/material/sort";
import {RoomService} from "../../../../shared/services/room.service";
import {Room} from "../../../../shared/models/room.model";
import {ConfirmDialogComponent} from "../../../../shared/dialogs/confirm-dialog/confirm-dialog.component";
import {TeacherDeleteConfirmationComponent} from "../../../teacher/components/teacher-delete-confirmation/teacher-delete-confirmation.component";
import {RoomDeleteConfirmationComponent} from "../room-delete-confirmation/room-delete-confirmation.component";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  @ViewChild(MatTable, { static: false })
  matTable: MatTable<any>;

  dataSource = new MatTableDataSource([]);
  room$: Observable<Room[]>
  displayedColumns = ["id", "name", "capacity", "edit", "delete"]


  constructor(private roomService: RoomService,
              private dialog: MatDialog) {

  }

  ngOnInit() {
    this.room$ = this.roomService.getRooms();
    this.getRooms();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.dataSource.sortData(this.dataSource.data, this.sort);
      this.matTable.renderRows();
    });
  }

  getRooms() {
    this.room$.subscribe(
      rooms => {
        this.dataSource.data = rooms;
      }
    )
  }

  searchRooms(search: string) {
    this.dataSource.filter = search.toLowerCase().trim();
  }

  editRoom(room: Room) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": true, room };

    const dialogRef =  this.dialog.open(RoomDetailComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        tap(formVal => {
          if(formVal) {
            formVal.id = room.id;
          }
        }),
        concatMap(formVal => {
          if (formVal) {
            return this.roomService.updateRoom(formVal);
          } else {
            return of({});
          }
        }),
        catchError(val => of(`error caught: ${val}`))
      )
      .subscribe(
        returnVal => {
          if (returnVal['result'] === 'success') {
            this.getRooms();
          }
        }
      )
  }

  createRoom() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": false };

    const dialogRef =  this.dialog.open(RoomDetailComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        concatMap(formVal => {
          if (formVal) {
            return this.roomService.createRoom(formVal);
          } else {
            return of({});
          }
        }),
        catchError(err => of(`error caught: ${err}`))
      )
      .subscribe(
        returnVal => {
          if (returnVal['result'] === 'success') {
            this.getRooms();
          }
        }
      )
  }

  deleteRoom(room: Room) {

    const dialogRef = this.dialog.open(RoomDeleteConfirmationComponent, {
      maxWidth: "400px",
      data: {
        id: room.id,
        name: `${room.name}`,
        title: "Are you sure?",
        message: `You are about to delete ${room.name}`
      }
    });


    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.roomService.deleteRoom(room.id)
          .subscribe(
            () => {
              this.getRooms();
            }
          )
      }
    });
  }

}
