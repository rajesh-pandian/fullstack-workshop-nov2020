import { NgModule } from '@angular/core';
import {StudentCourseComponent} from "./components/student-course/student-course.component";
import {StudentCourseDetailComponent} from "./components/student-course-detail/student-course-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [
  { path: '', component: StudentCourseComponent }
];

@NgModule({
  declarations: [
    StudentCourseComponent,
    StudentCourseDetailComponent
  ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        MatPaginatorModule,
        MatProgressSpinnerModule
    ],
  entryComponents: [
    StudentCourseDetailComponent
  ]
})
export class StudentCourseModule { }
