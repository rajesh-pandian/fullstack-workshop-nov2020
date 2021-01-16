import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, merge, of, Subscription} from "rxjs";
import {MatTable} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TeacherDetailComponent} from "../teacher-detail/teacher-detail.component";
import {catchError, concatMap, debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {TeacherService} from "../../../../shared/services/teacher.service";
import {Teacher} from "../../../../shared/models/teacher.model";
import {TeacherDeleteConfirmationComponent} from "../teacher-delete-confirmation/teacher-delete-confirmation.component";
import {AuthService} from "../../../../shared/services/auth.service";
import {TeacherDatasource} from "../../../../shared/services/teacher.datasource";
import {MatPaginator} from "@angular/material/paginator";

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

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild('input', { static: false })
  input: ElementRef;

  dataSource: TeacherDatasource;
  numTeachers = 100;

  displayedColumns = ["id", "firstName", "lastName", "edit", "delete"]

  $subscription = new Subscription();
  isAuthenticated: boolean = false;

  constructor(private teacherService: TeacherService,
              private authService: AuthService,
              private dialog: MatDialog) { }


  ngOnInit() {

    this.dataSource = new TeacherDatasource(this.teacherService);
    this.dataSource.loadTeachers('', 'lastName', 'asc', '0', '12');
    this.$subscription.add(
      this.dataSource.numTeachers$.subscribe(
        count => this.numTeachers = count
      )
    );

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
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)
    );

    this.$subscription.add(
      fromEvent(this.input.nativeElement,'keyup')
        .pipe(
          debounceTime(350),
          distinctUntilChanged(),
          tap(() => {
            this.paginator.pageIndex = 0;
            this.getTeachers();
          })
        )
        .subscribe()
    );

    this.$subscription.add(
      merge(this.paginator.page, this.sort.sortChange)
        .pipe(
          tap(() => {
              this.getTeachers();
            }
          )
        )
        .subscribe()
    );
  }

  getTeachers() {
    this.dataSource.loadTeachers(
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex.toString(),
      this.paginator.pageSize.toString()
    );
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
