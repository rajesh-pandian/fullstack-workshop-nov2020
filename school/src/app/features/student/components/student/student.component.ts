import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, merge, Observable, of, Subscription} from "rxjs";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {catchError, concatMap, debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {StudentDetailComponent} from "../student-detail/student-detail.component";
import {MatSort} from "@angular/material/sort";
import {StudentService} from "../../../../shared/services/student.service";
import {Student} from "../../../../shared/models/student.model";
import {StudentDeleteConfirmationComponent} from "../student-delete-confirmation/student-delete-confirmation.component";
import {AuthService} from "../../../../shared/services/auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {StudentDatasource} from "../../../../shared/services/student.datasource";


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  @ViewChild(MatTable, { static: false })
  matTable: MatTable<any>;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild('input', { static: false })
  input: ElementRef;

  dataSource: StudentDatasource;
  numStudents = 100;

  displayedColumns = ["id", "firstName", "lastName", "edit", "delete"]

  $subscription = new Subscription();
  isAuthenticated: boolean = false;

  constructor(private studentService: StudentService,
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {

    this.dataSource = new StudentDatasource(this.studentService);
    this.dataSource.loadStudents('', 'lastName', 'asc', '0', '12');
    this.$subscription.add(
      this.dataSource.numStudents$.subscribe(
        count => this.numStudents = count
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
            this.getStudents();
          })
        )
        .subscribe()
    );

    this.$subscription.add(
      merge(this.paginator.page, this.sort.sortChange)
        .pipe(
          tap(() => {
              this.getStudents();
            }
          )
        )
        .subscribe()
    );
  }

  getStudents() {
    this.dataSource.loadStudents(
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex.toString(),
      this.paginator.pageSize.toString()
    );
  }

  editStudent(student: Student) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": true, student };

    const dialogRef =  this.dialog.open(StudentDetailComponent, dialogConfig);

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          tap(formVal => {
            if (formVal) {
              formVal.id = student.id;
            }
          }),
          concatMap(formVal => {
            if (formVal) {
              return this.studentService.updateStudent(formVal);
            } else {
              return of({});
            }
          }),
          catchError(val => of(`error caught: ${val}`))
        )
        .subscribe(
          returnVal => {
            if (returnVal['result'] === 'success') {
              this.getStudents();
            }
          }
        )
    );
  }

  createStudent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": false };

    const dialogRef =  this.dialog.open(StudentDetailComponent, dialogConfig);

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          concatMap(formVal => {
            if (formVal) {
              return this.studentService.createStudent(formVal);
            } else {
              return of({});
            }
          }),
          catchError(err => of(`error caught: ${err}`))
        )
        .subscribe(
          returnVal => {
            if (returnVal['result'] === 'success') {
              this.getStudents();
            }
          }
        )
    );
  }

  deleteStudent(student: Student) {

    const dialogRef = this.dialog.open(StudentDeleteConfirmationComponent, {
      maxWidth: "400px",
      data: {
        id: student.id,
        name: `${student.firstName} ${student.lastName}`,
        title: "Are you sure?",
        message: `You are about to delete ${student.firstName} ${student.lastName}`
      }
    });

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          concatMap(dialogResult => {
            if (dialogResult && dialogResult === true) {
              return this.studentService.deleteStudent(student.id);
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
              this.getStudents()
            }
          },
          error => console.log('error in deletion of student ', error)
        )
    );

  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

}
