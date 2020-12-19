import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Student} from "../../../../shared/models/student.model";


enum Mode {
  create,
  edit
}

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit {

  instruction = "Add Student";
  mode = Mode.create;
  form: FormGroup;
  student: Student;
  modeEnum = Mode;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<StudentDetailComponent> ) {


    this.student = data['student'];

    if(data.edit == true) {
      this.instruction = "Edit Student";
      this.mode = Mode.edit;

      this.form = fb.group({
        firstName: [this.student.firstName, Validators.required],
        lastName: [this.student.lastName, Validators.required]
      })

    } else {
      this.form = fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      })
    }

  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  create() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

}
