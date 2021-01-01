import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {StudentCourse} from "../models/course.model";
import {BehaviorSubject, forkJoin, Observable, of, Subscription} from "rxjs";
import {StudentCourseService} from "./student-course.service";
import {catchError, finalize} from "rxjs/operators";


export class StudentCourseDatasource implements DataSource<StudentCourse> {

  $subscription = new Subscription();

  private studentCourseSubject = new BehaviorSubject<StudentCourse[]>([])

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private numStudentCoursesSubject = new BehaviorSubject<number>(0);
  public numStudentCourses$ = this.numStudentCoursesSubject.asObservable();


  constructor(private studentCourseService: StudentCourseService) {

  }


  loadStudentCourses(filter: string,
                     sortField: string,
                     sortDirection: string,
                     pageIndex: string,
                     pageSize: string) {

    let count = 0;
    let studentCourses: StudentCourse[] = [];

    this.loadingSubject.next(true);

    let studentCoursesCount$ = this.studentCourseService.countStudentCourses(filter);
    let studentCourses$ = this.studentCourseService.getStudentCoursesFiltered(filter, sortField, sortDirection, pageIndex, pageSize);

    this.$subscription.add(
      forkJoin([studentCoursesCount$, studentCourses$])
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(
          results => {
            [count, studentCourses] = results;
            if (count) {
              this.numStudentCoursesSubject.next(count);
            }
            if (studentCourses) {
              this.studentCourseSubject.next(studentCourses);
            }
          }
        )
    );

  }

  connect(collectionViewer: CollectionViewer): Observable<StudentCourse[]> {
    return this.studentCourseSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.studentCourseSubject.complete();
    this.loadingSubject.complete();
    this.numStudentCoursesSubject.complete();
    this.$subscription.unsubscribe();
  }

}
