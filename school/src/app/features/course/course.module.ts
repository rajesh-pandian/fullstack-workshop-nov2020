import { NgModule } from '@angular/core';
import {CourseComponent} from "./components/course/course.component";
import {CourseDetailComponent} from "./components/course-detail/course-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { CourseDeleteConfirmationComponent } from './components/course-delete-confirmation/course-delete-confirmation.component';

const routes: Routes = [
  { path: '', component: CourseComponent }
];

@NgModule({
  declarations: [
    CourseComponent,
    CourseDetailComponent,
    CourseDeleteConfirmationComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    CourseDetailComponent,
    CourseDeleteConfirmationComponent
  ]
})
export class CourseModule { }
