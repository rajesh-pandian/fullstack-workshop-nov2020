import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherComponent} from "./components/teacher/teacher.component";
import {TeacherDetailComponent} from "./components/teacher-detail/teacher-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { TeacherDeleteConfirmationComponent } from './components/teacher-delete-confirmation/teacher-delete-confirmation.component';
import {MatCheckboxModule} from "@angular/material/checkbox";


const routes: Routes = [
  { path: '', component: TeacherComponent }
];


@NgModule({
  declarations: [
    TeacherComponent,
    TeacherDetailComponent,
    TeacherDeleteConfirmationComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatCheckboxModule
  ],
  entryComponents: [
    TeacherDetailComponent,
    TeacherDeleteConfirmationComponent
  ]
})
export class TeacherModule { }
