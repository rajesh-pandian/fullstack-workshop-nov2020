import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TeacherDetailComponent} from "../teacher-detail/teacher-detail.component";
import {catchError, concatMap, tap} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {TeacherService} from "../../../../shared/services/teacher.service";
import {Teacher} from "../../../../shared/models/teacher.model";
import {TeacherDeleteConfirmationComponent} from "../teacher-delete-confirmation/teacher-delete-confirmation.component";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  @ViewChild(MatTable, { static: false })
  matTable: MatTable<any>;

  dataSource = new MatTableDataSource([]);
  teachers$: Observable<Teacher[]>
  displayedColumns = ["id", "firstName", "lastName", "edit", "delete"]

  $subscription = new Subscription();
  isAuthenticated: boolean = false;

  constructor(private teacherService: TeacherService,
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.teachers$ = this.teacherService.getTeachers();
    this.getTeachers();

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

  getTeachers() {
    this.$subscription.add(
      this.teachers$.subscribe(
        teachers => {
          this.dataSource.data = teachers;
        }
      )
    );
  }

  searchTeachers(search: string) {
    this.dataSource.filter = search.toLowerCase().trim();
  }

  editTeacher(teacher: Teacher) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": true, teacher };

    const dialogRef =  this.dialog.open(TeacherDetailComponent, dialogConfig);

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          tap(formVal => {
            if (formVal) {
              formVal.id = teacher.id;
            }
          }),
          concatMap(formVal => {
            if (formVal) {
              return this.teacherService.updateTeacher(formVal);
            } else {
              return of({});
            }
          }),
          catchError(val => of(`error caught: ${val}`))
        )
        .subscribe(
          returnVal => {
            if (returnVal['result'] === 'success') {
              this.getTeachers();
            }
          }
        )
    );

  }


  createTeacher() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": false };

    const dialogRef =  this.dialog.open(TeacherDetailComponent, dialogConfig);

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          concatMap(formVal => {
            if (formVal) {
              return this.teacherService.createTeacher(formVal);
            } else {
              return of({});
            }
          }),
          catchError(err => of(`error caught: ${err}`))
        )
        .subscribe(
          returnVal => {
            if (returnVal['result'] === 'success') {
              this.getTeachers();
            }
          }
        )
    )
  }

  deleteTeacher(teacher: Teacher) {

    const dialogRef = this.dialog.open(TeacherDeleteConfirmationComponent, {
      maxWidth: "400px",
      data: {
        id: teacher.id,
        name: `${teacher.firstName} ${teacher.lastName}`,
        title: "Are you sure?",
        message: `You are about to delete ${teacher.firstName} ${teacher.lastName}`}
    });


    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          concatMap(dialogResult => {
            if (dialogResult && dialogResult === true) {
              return this.teacherService.deleteTeacher(teacher.id);
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
              this.getTeachers()
            }
          },
          error => console.log('error in deletion of teacher ', error)
        )
    );

  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

}
