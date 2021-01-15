import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, forkJoin, Observable, of, Subscription} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {Subject} from "../models/subject.model";
import {SubjectService} from "./subject.service";

export class SubjectDatasource implements DataSource<Subject> {

  $subscription = new Subscription();

  private subjectSubject = new BehaviorSubject<Subject[]>([])

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private numSubjectsSubject = new BehaviorSubject<number>(0);
  public numSubjects$ = this.numSubjectsSubject.asObservable();


  constructor(private subjectService: SubjectService) {

  }


  loadSubjects(filter: string,
              sortField: string,
              sortDirection: string,
              pageIndex: string,
              pageSize: string) {

    let count = 0;
    let subjects: Subject[] = [];

    this.loadingSubject.next(true);

    let subjectsCount$ = this.subjectService.countSubjects(filter);
    let subjects$ = this.subjectService.getSubjectsFiltered(filter, sortField, sortDirection, pageIndex, pageSize);

    this.$subscription.add(
      forkJoin([subjectsCount$, subjects$])
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(
          results => {
            [count, subjects] = results;
            if (count) {
              this.numSubjectsSubject.next(count);
            }
            if (subjects) {
              this.subjectSubject.next(subjects);
            }
          }
        )
    );
  }

  connect(collectionViewer: CollectionViewer): Observable<Subject[]> {
    return this.subjectSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.subjectSubject.complete();
    this.loadingSubject.complete();
    this.numSubjectsSubject.complete();
    this.$subscription.unsubscribe();
  }

}
