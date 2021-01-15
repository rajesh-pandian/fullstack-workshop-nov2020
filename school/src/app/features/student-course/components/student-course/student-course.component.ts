import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, merge, Observable, of, Subscription} from "rxjs";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {catchError, concatMap, debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {StudentCourseDetailComponent} from "../student-course-detail/student-course-detail.component";
import {MatSort} from "@angular/material/sort";
import {StudentCourse} from "../../../../shared/models/course.model";
import {StudentCourseService} from "../../../../shared/services/student-course.service";
import {ConfirmDialogComponent} from "../../../../shared/dialogs/confirm-dialog/confirm-dialog.component";
import {StudentCourseDatasource} from "../../../../shared/services/student-course.datasource";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.scss']
})
export class StudentCourseComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  @ViewChild(MatTable, { static: false })
  matTable: MatTable<any>;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild('input', { static: false })
  input: ElementRef;

  dataSource: StudentCourseDatasource;
  $subscription = new Subscription();
  numStudentCourses = 100;

  displayedColumns = [  "name", "studentLastName", "edit", "delete" ]

  isAuthenticated: boolean = false;

  constructor(private studentCourseService: StudentCourseService,
              private authService: AuthService,
              private dialog: MatDialog) {

  }

  ngOnInit() {
    this.dataSource = new StudentCourseDatasource(this.studentCourseService);
    this.dataSource.loadStudentCourses('', 'name','asc', '0', '15');
    this.$subscription.add(
      this.dataSource.numStudentCourses$.subscribe(
        count => this.numStudentCourses = count
      )
    );

    this.$subscription.add(
      this.authService.authStatusChanges()
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
            this.getStudentCourses();
          })
        )
        .subscribe()
    );

    this.$subscription.add(
      merge(this.paginator.page, this.sort.sortChange)
        .pipe(
          tap(() => {
            this.getStudentCourses();
            }
          )
        )
        .subscribe()
    );
  }


  getStudentCourses() {

    this.dataSource.loadStudentCourses(
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex.toString(),
      this.paginator.pageSize.toString()
    );
  }


  editStudentCourse(studentCourse: StudentCourse) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": true, studentCourse };

    const dialogRef =  this.dialog.open(StudentCourseDetailComponent, dialogConfig);

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          tap(formVal => {
           if (formVal) {
             formVal.id = studentCourse.id;
           }
          }),
          concatMap(formVal => {
            if (formVal) {
              return this.studentCourseService.updateStudentCourse(formVal);
            } else {
              return of({});
            }
          }),
          catchError(val => of(`error caught: ${val}`))
        )
        .subscribe(
          returnVal => {
             if (returnVal['result'] === 'success') {
               this.getStudentCourses();
             }
          }
        )
    );
  }

  createStudentCourse() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": false };

    const dialogRef =  this.dialog.open(StudentCourseDetailComponent, dialogConfig);

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          concatMap(formVal => {
            if (formVal) {
              return this.studentCourseService.createStudentCourse(formVal);
            } else {
              return of({});
            }
          }),
          catchError(err => of(`error caught: ${err}`))
        )
        .subscribe(
          returnVal => {
            if (returnVal['result'] === 'success') {
              this.getStudentCourses();
            }
          }
        )
    )
  }

  deleteStudentCourse(studentCourse: StudentCourse) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Are you sure?",
        message: `You are about to delete  ${studentCourse.name}: ${studentCourse.studentFirstName} ${studentCourse.studentLastName}`}
    });

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          concatMap(dialogResult => {
            if (dialogResult && dialogResult === true) {
              return this.studentCourseService.deleteStudentCourse(studentCourse.id);
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
              this.getStudentCourses()
            }
          },
          error => console.log('error in deletion of student-course ', error)
        )
    );

  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
}
