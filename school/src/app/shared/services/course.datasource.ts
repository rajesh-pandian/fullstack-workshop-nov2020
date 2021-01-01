import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Course} from "../models/course.model";
import {BehaviorSubject, forkJoin, Observable, of, Subscription} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {CourseService} from "./course.service";

export class CourseDatasource implements DataSource<Course> {

  $subscription = new Subscription();

  private courseSubject = new BehaviorSubject<Course[]>([])

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private numCoursesSubject = new BehaviorSubject<number>(0);
  public numCourses$ = this.numCoursesSubject.asObservable();


  constructor(private courseService: CourseService) {

  }


  loadCourses(filter: string,
              sortField: string,
              sortDirection: string,
              pageIndex: string,
              pageSize: string) {

    let count = 0;
    let courses: Course[] = [];

    this.loadingSubject.next(true);

    let coursesCount$ = this.courseService.countCourses(filter);
    let courses$ = this.courseService.getCoursesFiltered(filter, sortField, sortDirection, pageIndex, pageSize);

    this.$subscription.add(
      forkJoin([coursesCount$, courses$])
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(
          results => {
            [count, courses] = results;
            if (count) {
              this.numCoursesSubject.next(count);
            }
            if (courses) {
              this.courseSubject.next(courses);
            }
          }
        )
    );
  }

  connect(collectionViewer: CollectionViewer): Observable<Course[]> {
    return this.courseSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.courseSubject.complete();
    this.loadingSubject.complete();
    this.numCoursesSubject.complete();
    this.$subscription.unsubscribe();
  }

}
