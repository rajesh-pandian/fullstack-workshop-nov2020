import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Teacher} from "../../../../shared/models/teacher.model";

enum Mode {
  create,
  edit
}

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnInit {

  instruction = "Create Teacher";
  mode = Mode.create;
  form: FormGroup;
  teacher: Teacher;
  modeEnum = Mode;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TeacherDetailComponent> ) {

    this.teacher = data['teacher'];

    if(data.edit == true) {
      this.instruction = "Edit Teacher";
      this.mode = Mode.edit;

      this.form = fb.group({
        firstName: [this.teacher.firstName, Validators.required],
        lastName: [this.teacher.lastName, Validators.required]
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
