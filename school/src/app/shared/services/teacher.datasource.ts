import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, forkJoin, Observable, of, Subscription} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {Teacher} from "../models/teacher.model";
import {TeacherService} from "./teacher.service";


export class TeacherDatasource implements DataSource<Teacher> {

  $subscription = new Subscription();

  private teacherSubject = new BehaviorSubject<Teacher[]>([])

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private numTeachersSubject = new BehaviorSubject<number>(0);
  public numTeachers$ = this.numTeachersSubject.asObservable();


  constructor(private teacherService: TeacherService) {

  }


  loadTeachers(filter: string,
                     sortField: string,
                     sortDirection: string,
                     pageIndex: string,
                     pageSize: string) {

    console.log(`in loadteachers`);


    let count = 0;
    let teachers: Teacher[] = [];

    this.loadingSubject.next(true);

    let teacherCount$ = this.teacherService.countTeachers(filter);
    let teachers$ = this.teacherService.getTeachersFiltered(filter, sortField, sortDirection, pageIndex, pageSize);

    this.$subscription.add(
      forkJoin([teacherCount$, teachers$])
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(
          results => {
            [count, teachers] = results;
            if (count) {
              this.numTeachersSubject.next(count);
            }
            if (teachers) {
              this.teacherSubject.next(teachers);
            }
          }
        )
    );

  }

  connect(collectionViewer: CollectionViewer): Observable<Teacher[]> {
    return this.teacherSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.teacherSubject.complete();
    this.loadingSubject.complete();
    this.numTeachersSubject.complete();
    this.$subscription.unsubscribe();
  }

}
