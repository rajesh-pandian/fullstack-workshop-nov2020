import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {catchError, concatMap, tap} from "rxjs/operators";
import {StudentDetailComponent} from "../student-detail/student-detail.component";
import {MatSort} from "@angular/material/sort";
import {StudentService} from "../../../../shared/services/student.service";
import {Student} from "../../../../shared/models/student.model";
import {StudentDeleteConfirmationComponent} from "../student-delete-confirmation/student-delete-confirmation.component";



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  @ViewChild(MatTable, { static: false })
  matTable: MatTable<any>;

  dataSource = new MatTableDataSource([]);
  students$: Observable<Student[]>
  displayedColumns = ["id", "firstName", "lastName", "edit", "delete"]

  constructor(private studentService: StudentService,
              private dialog: MatDialog) {

  }

  ngOnInit() {
    this.students$ = this.studentService.getStudents();
    this.getStudents();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.dataSource.sortData(this.dataSource.data, this.sort);
      this.matTable.renderRows();
    });
  }

  getStudents() {
    this.students$.subscribe(
      students => {
        this.dataSource.data = students;
      }
    )
  }

  searchStudents(search: string) {
    this.dataSource.filter = search.toLowerCase().trim();
  }

  editStudent(student: Student) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": true, student };

    const dialogRef =  this.dialog.open(StudentDetailComponent, dialogConfig);

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
  }

  createStudent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": false };

    const dialogRef =  this.dialog.open(StudentDetailComponent, dialogConfig);

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

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.studentService.deleteStudent(student.id)
          .subscribe(
            () => {
              this.getStudents();
            }
          )
      }
    });


  }

}
