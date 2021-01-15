import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {catchError, concatMap, tap} from "rxjs/operators";
import {RoomDetailComponent} from "../room-detail/room-detail.component";
import {MatSort} from "@angular/material/sort";
import {RoomService} from "../../../../shared/services/room.service";
import {Room} from "../../../../shared/models/room.model";
import {RoomDeleteConfirmationComponent} from "../room-delete-confirmation/room-delete-confirmation.component";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  @ViewChild(MatTable, { static: false })
  matTable: MatTable<any>;

  dataSource = new MatTableDataSource([]);
  room$: Observable<Room[]>
  displayedColumns = ["id", "name", "capacity", "edit", "delete"]

  $subscription = new Subscription();
  isAuthenticated: boolean = false;

  constructor(private roomService: RoomService,
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.room$ = this.roomService.getRooms();
    this.getRooms();

    this.$subscription.add(this.authService.authStatusChanges()
      .subscribe(
        authenticated => {
          this.isAuthenticated = authenticated;
        }
      )
    );
  }

  ngAfterViewInit() {
    this.$subscription.add(
        this.sort.sortChange.subscribe(() => {
        this.dataSource.sortData(this.dataSource.data, this.sort);
        this.matTable.renderRows();
      })
    );
  }

  getRooms() {
    this.$subscription.add(
      this.room$.subscribe(
        rooms => {
          this.dataSource.data = rooms;
        }
      )
    );
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

    this.$subscription.add(
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
    );
  }

  createRoom() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": false };

    const dialogRef =  this.dialog.open(RoomDetailComponent, dialogConfig);

    this.$subscription.add(
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
    );
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

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          concatMap(dialogResult => {
            if (dialogResult && dialogResult === true) {
              return this.roomService.deleteRoom(room.id);
            } else {
              return of({'result': 'skipped'});
            }
          }),
          catchError(
            err => { return of(`error caught: ${err}`) }
          )
        )
        .subscribe(
          deletionResult => {
            if (deletionResult && deletionResult.result && deletionResult.result === 'success') {
              this.getRooms()
            }
          },
          error => console.log('error in deletion of room ', error)
        )
    );

  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

}
