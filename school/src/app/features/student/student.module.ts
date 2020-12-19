import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentComponent} from "./components/student/student.component";
import {StudentDetailComponent} from "./components/student-detail/student-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {CourseComponent} from "../course/components/course/course.component";
import {SharedModule} from "../../shared/shared.module";
import { StudentDeleteConfirmationComponent } from './components/student-delete-confirmation/student-delete-confirmation.component';

const routes: Routes = [
  { path: '', component: StudentComponent }
];

@NgModule({
  declarations: [
    StudentComponent,
    StudentDetailComponent,
    StudentDeleteConfirmationComponent,
  ],
  imports: [
    //CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    StudentDetailComponent,
    StudentDeleteConfirmationComponent
  ]
})
export class StudentModule { }
