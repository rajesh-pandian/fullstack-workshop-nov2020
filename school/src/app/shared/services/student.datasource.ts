import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, forkJoin, Observable, of, Subscription} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {Student} from "../models/student.model";
import {StudentService} from "./student.service";


export class StudentDatasource implements DataSource<Student> {

  $subscription = new Subscription();

  private studentSubject = new BehaviorSubject<Student[]>([])

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private numStudentsSubject = new BehaviorSubject<number>(0);
  public numStudents$ = this.numStudentsSubject.asObservable();

  constructor(private studentService: StudentService) { }

  loadStudents(filter: string,
                     sortField: string,
                     sortDirection: string,
                     pageIndex: string,
                     pageSize: string) {

    let count = 0;
    let students: Student[] = [];

    this.loadingSubject.next(true);

    let studentCount$ = this.studentService.countStudents(filter);
    let students$ = this.studentService.getStudentsFiltered(filter, sortField, sortDirection, pageIndex, pageSize);

    this.$subscription.add(
      forkJoin([studentCount$, students$])
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(
          results => {
            [count, students] = results;
            if (count) {
              this.numStudentsSubject.next(count);
            }
            if (students) {
              this.studentSubject.next(students);
            }
          }
        )
    );

  }

  connect(collectionViewer: CollectionViewer): Observable<Student[]> {
    return this.studentSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.studentSubject.complete();
    this.loadingSubject.complete();
    this.numStudentsSubject.complete();
    this.$subscription.unsubscribe();
  }

}
