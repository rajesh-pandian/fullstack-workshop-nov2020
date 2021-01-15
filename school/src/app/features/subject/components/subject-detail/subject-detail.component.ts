import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../../../shared/models/subject.model";
import {Mode} from "../../../../shared/models/enums";


@Component({
  selector: 'app-room-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {

  instruction = "Add Subject";
  mode = Mode.create;
  form: FormGroup;
  subject: Subject;
  modeEnum = Mode;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<SubjectDetailComponent> ) {

    this.subject = data['subject'];
    let defDescription = '';

    if(data.edit == true) {
      this.instruction = "Edit Subject";
      this.mode = Mode.edit;
      defDescription = this.subject.description;
    }

    this.form = fb.group({
      description: [defDescription, [Validators.required, Validators.minLength(4)]],
    })

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
