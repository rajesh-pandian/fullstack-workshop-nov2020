import { NgModule } from '@angular/core';
import {TeacherComponent} from "./components/teacher/teacher.component";
import {TeacherDetailComponent} from "./components/teacher-detail/teacher-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { TeacherDeleteConfirmationComponent } from './components/teacher-delete-confirmation/teacher-delete-confirmation.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

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
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    TeacherDetailComponent,
    TeacherDeleteConfirmationComponent
  ]
})
export class TeacherModule { }
