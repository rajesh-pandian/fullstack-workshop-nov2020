import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, merge, of, Subscription} from "rxjs";
import {MatTable} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {catchError, concatMap, debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SubjectDatasource} from "../../../../shared/services/subject.datasource";
import {SubjectService} from "../../../../shared/services/subject.service";
import {Subject} from "../../../../shared/models/subject.model";
import {SubjectDetailComponent} from "../subject-detail/subject-detail.component";
import {SubjectDeleteConfirmationComponent} from "../subject-delete-confirmation/subject-delete-confirmation.component";
import {AuthService} from "../../../../shared/services/auth.service";


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  @ViewChild(MatTable, { static: false })
  matTable: MatTable<any>;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild('input', { static: false })
  input: ElementRef;

  dataSource: SubjectDatasource;
  $subscription = new Subscription();
  numSubjects = 100;

  displayedColumns = ["id", "description", "edit", "delete"]

  isAuthenticated: boolean = false;

  constructor(private subjectService: SubjectService,
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new SubjectDatasource(this.subjectService);
    this.dataSource.loadSubjects('', 'name','asc', '0', '15');
    this.$subscription.add(
        this.dataSource.numSubjects$.subscribe(
            count => this.numSubjects = count
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
                  this.getSubjects();
                })
            )
            .subscribe()
    );

    this.$subscription.add(
        merge(this.paginator.page, this.sort.sortChange)
            .pipe(
                tap(() => {
                      this.getSubjects();
                    }
                )
            )
            .subscribe()
    );

  }

  getSubjects() {

    this.dataSource.loadSubjects(
        this.input.nativeElement.value,
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex.toString(),
        this.paginator.pageSize.toString()
    );
  }

  editSubject(subject: Subject) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": true, subject };

    const dialogRef =  this.dialog.open(SubjectDetailComponent, dialogConfig);

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          tap(formVal => {
            if (formVal) {
              formVal.id = subject.id;
            }
          }),
          concatMap(formVal => {
            if (formVal) {
              return this.subjectService.updateSubject(formVal);
            } else {
              return of({});
            }
          }),
          catchError(val => of(`error caught: ${val}`))
        )
        .subscribe(
          returnVal => {
            if (returnVal['result'] === 'success') {
              this.getSubjects();
            }
          }
        )
    );
  }

  createSubject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": false };

    const dialogRef = this.dialog.open(SubjectDetailComponent, dialogConfig);

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          concatMap(formVal => {
            if (formVal) {
              return this.subjectService.createSubject(formVal);
            } else {
              return of({});
            }
          }),
          catchError(err => of(`error caught: ${err}`))
        )
        .subscribe(
          returnVal => {
            if (returnVal['result'] === 'success') {
              this.getSubjects();
            }
          }
        )
    );
  }


  deleteSubject(subject: Subject) {

    const dialogRef = this.dialog.open(SubjectDeleteConfirmationComponent, {
      maxWidth: "400px",
      data: {
        id: subject.id,
        name: `${subject.description}`,
        title: "Are you sure?",
        message: `You are about to delete ${subject.description}`
      }
    });


    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          concatMap(dialogResult => {
            if (dialogResult && dialogResult === true) {
              return this.subjectService.deleteSubject(subject.id);
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
              this.getSubjects()
            }
          },
          error => console.log('error in deletion of subject ', error)
        )
    );

  }

  ngOnDestroy() {
      this.$subscription.unsubscribe();
  }

}
