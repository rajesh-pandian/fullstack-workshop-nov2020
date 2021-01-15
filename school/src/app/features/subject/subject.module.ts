import { NgModule } from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SubjectComponent} from "./components/subject/subject.component";
import {SubjectDetailComponent} from "./components/subject-detail/subject-detail.component";
import {SubjectDeleteConfirmationComponent} from "./components/subject-delete-confirmation/subject-delete-confirmation.component";

const routes: Routes = [
  { path: '', component: SubjectComponent }
];

@NgModule({
  declarations: [
    SubjectComponent,
    SubjectDetailComponent,
    SubjectDeleteConfirmationComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  entryComponents: [
    SubjectDetailComponent,
    SubjectDeleteConfirmationComponent
  ]
})
export class SubjectModule { }
