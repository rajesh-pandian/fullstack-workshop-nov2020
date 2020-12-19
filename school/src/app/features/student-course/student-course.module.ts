import { NgModule } from '@angular/core';
import {StudentCourseComponent} from "./components/student-course/student-course.component";
import {StudentCourseDetailComponent} from "./components/student-course-detail/student-course-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

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
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    StudentCourseDetailComponent
  ]
})
export class StudentCourseModule { }
