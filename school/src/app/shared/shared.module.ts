import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

const MODULES = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,

  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,

  MatTableModule,
  MatFormFieldModule,
  MatMenuModule,
  MatDialogModule,
  MatSelectModule,
  MatSortModule,

];

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
