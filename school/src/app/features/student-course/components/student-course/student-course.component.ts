import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {catchError, concatMap, tap} from "rxjs/operators";
import {StudentCourseDetailComponent} from "../student-course-detail/student-course-detail.component";
import {MatSort} from "@angular/material/sort";
import {StudentCourse} from "../../../../shared/models/course.model";
import {StudentCourseService} from "../../../../shared/services/student-course.service";
import {ConfirmDialogComponent} from "../../../../shared/dialogs/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.scss']
})
export class StudentCourseComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  @ViewChild(MatTable, { static: false })
  matTable: MatTable<any>;

  dataSource = new MatTableDataSource([]);
  studentCourse$: Observable<StudentCourse[]>
  displayedColumns = [  "name", "studentLastName", "edit", "delete" ]

  iterator = 0;

  constructor(private studentCourseService: StudentCourseService,
              private dialog: MatDialog) {

  }

  ngOnInit() {
    this.studentCourse$ = this.studentCourseService.getStudentCourses();
    this.getStudentCourses();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.dataSource.sortData(this.dataSource.data, this.sort);
      this.matTable.renderRows();
    });
  }

  getStudentCourses() {
    this.studentCourse$.subscribe(
      studCrs => {
        console.log('got student courses ', studCrs);
        this.dataSource.data = studCrs;
      }
    )
  }

  searchStudentCourses(search: string) {
    this.dataSource.filter = search.toLowerCase().trim();
  }

  editStudentCourse(studentCourse: StudentCourse) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": true, studentCourse };

    const dialogRef =  this.dialog.open(StudentCourseDetailComponent, dialogConfig);

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
  }

  createStudentCourse() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": false };

    const dialogRef =  this.dialog.open(StudentCourseDetailComponent, dialogConfig);

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
  }

  deleteStudentCourse(studentCourse: StudentCourse) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Are you sure?",
        message: `You are about to delete  ${studentCourse.name}: ${studentCourse.studentFirstName} ${studentCourse.studentLastName}`}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.studentCourseService.deleteStudentCourse(studentCourse.id)
          .subscribe(
            () => {
              this.getStudentCourses();
            }
          )
      }
    });

  }

   // todo: remove this test code
  searchForLike(studentCourse: StudentCourse) {
    console.log('in search for like');
    if (this.iterator++ % 2 === 0) {
      this.studentCourseService.searchStudentCourseByStudentId(studentCourse.studentId)
        .subscribe(
          res => {
            console.log('got results of search for like ', res);
          }
        )
    } else {
      this.studentCourseService.searchStudentCourseByCourseId(studentCourse.courseId)
        .subscribe(
          res => {
            console.log('got results of search for like ', res);
          }
        )
    }
  }
}
