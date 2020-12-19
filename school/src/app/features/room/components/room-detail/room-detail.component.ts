import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Room} from "../../../../shared/models/room.model";

enum Mode {
  create,
  edit
}

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  instruction = "Add Room";
  mode = Mode.create;
  form: FormGroup;
  room: Room;
  modeEnum = Mode;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<RoomDetailComponent> ) {

    this.room = data['room'];
    let defName = '';
    let defCapacity = 0;

    if(data.edit == true) {
      this.instruction = "Edit Room";
      this.mode = Mode.edit;
      defName = this.room.name;
      defCapacity = this.room.capacity;
    }

    this.form = fb.group({
      name: [defName, Validators.required],
      capacity: [defCapacity, [Validators.required, Validators.min(2)]]
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
