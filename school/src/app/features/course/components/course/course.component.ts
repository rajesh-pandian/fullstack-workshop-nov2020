import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {catchError, concatMap, tap} from "rxjs/operators";
import {CourseDetailComponent} from "../course-detail/course-detail.component";
import {MatSort} from "@angular/material/sort";
import {Course, CourseResolved} from "../../../../shared/models/course.model";
import {CourseService} from "../../../../shared/services/course.service";
import {CourseDeleteConfirmationComponent} from "../course-delete-confirmation/course-delete-confirmation.component";


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  @ViewChild(MatTable, { static: false })
  matTable: MatTable<any>;

  dataSource = new MatTableDataSource([]);
  course$: Observable<CourseResolved[]>

  displayedColumns = ["id", "name",  "description", "roomName", "teacherLastName", "edit", "delete"]

  constructor(private courseService: CourseService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.course$ = this.courseService.getCourses();
    this.getCourses();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.dataSource.sortData(this.dataSource.data, this.sort);
      this.matTable.renderRows();
    });
  }

  getCourses() {
    this.course$.subscribe(
      courses => {
        this.dataSource.data = courses;
      },
      error => {
        console.error('error getting courses ', error);
      }
    )
  }

  searchCourses(search: string) {
    this.dataSource.filter = search.toLowerCase().trim();
  }

  editCourse(course: CourseResolved) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": true, course };

    const dialogRef =  this.dialog.open(CourseDetailComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        tap(formVal => {
          if (formVal) {
            formVal.id = course.id;
          }
        }),
        concatMap(formVal => {
          if (formVal) {
            return this.courseService.updateCourse(formVal);
          } else {
            return of({});
          }
        }),
        catchError(val => of(`error caught: ${val}`))
      )
      .subscribe(
        returnVal => {
          if (returnVal['result'] === 'success') {
            this.getCourses();
          }
        }
      )
  }

  createCourse() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": false };

    const dialogRef =  this.dialog.open(CourseDetailComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        concatMap(formVal => {
          if (formVal) {
            return this.courseService.createCourse(formVal);
          } else {
            return of({});
          }
        }),
        catchError(err => of(`error caught: ${err}`))
      )
      .subscribe(
        returnVal => {
          if (returnVal['result'] === 'success') {
            this.getCourses();
          }
        }
      )
  }

  deleteCourse(course: Course) {

    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   maxWidth: "400px",
    //   data: {
    //     title: "Are you sure?",
    //     message: `You are about to delete  ${course.name}`}
    // });


    const dialogRef = this.dialog.open(CourseDeleteConfirmationComponent, {
      maxWidth: "400px",
      data: {
        id: course.id,
        name: `${course.name}`,
        title: "Are you sure?",
        message: `You are about to delete ${course.name}`
      }
    });


    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.courseService.deleteCourse(course.id)
          .subscribe(
            () => {
              this.getCourses();
            },
            error => {
              console.log('error in deletion of course ', error);
            }
          )
      }
    });

  }


  roomDetail(course: CourseResolved) {
    alert(`room capacity is ${course.capacity}`)
  }
}
