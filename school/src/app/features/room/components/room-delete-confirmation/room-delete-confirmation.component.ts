import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DelConDialogData} from "../../../../shared/models/deleteComfirmation.model";
import {deleteRoomValidator} from "../../delete-room.validator";
import {CourseService} from "../../../../shared/services/course.service";

@Component({
  selector: 'app-room-delete-confirmation',
  templateUrl: './room-delete-confirmation.component.html',
  styleUrls: ['./room-delete-confirmation.component.scss']
})
export class RoomDeleteConfirmationComponent implements OnInit {

  dialogData: DelConDialogData;
  title:string;
  message:string;

  roomId = this.fb.control(
    this.data.id, {
      validators: [Validators.required],
      asyncValidators: [deleteRoomValidator(this.courseService)],
      updateOn: "change"
    }
  )

  constructor(
    private router: Router,
    private courseService: CourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RoomDeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DelConDialogData
  ) {}

  ngOnInit() {
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
