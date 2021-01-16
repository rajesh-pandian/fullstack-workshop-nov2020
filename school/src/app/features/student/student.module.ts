import { NgModule } from '@angular/core';

import {StudentComponent} from "./components/student/student.component";
import {StudentDetailComponent} from "./components/student-detail/student-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { StudentDeleteConfirmationComponent } from './components/student-delete-confirmation/student-delete-confirmation.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";


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
    SharedModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  entryComponents: [
    StudentDetailComponent,
    StudentDeleteConfirmationComponent
  ]
})
export class StudentModule { }
