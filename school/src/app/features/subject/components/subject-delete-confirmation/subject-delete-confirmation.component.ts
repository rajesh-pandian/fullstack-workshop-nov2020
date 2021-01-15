import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DelConDialogData} from "../../../../shared/models/deleteComfirmation.model";
import {deleteSubjectValidator} from "../../delete-subject.validator";
import {CourseService} from "../../../../shared/services/course.service";

@Component({
  selector: 'app-room-delete-confirmation',
  templateUrl: './subject-delete-confirmation.component.html',
  styleUrls: ['./subject-delete-confirmation.component.scss']
})
export class SubjectDeleteConfirmationComponent implements OnInit {

  dialogData: DelConDialogData;
  title:string;
  message:string;

  subjectId = this.fb.control(
    this.data.id, {
      validators: [Validators.required],
      asyncValidators: [deleteSubjectValidator(this.courseService)],
      updateOn: "change"
    }
  )

  constructor(
    private router: Router,
    private courseService: CourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SubjectDeleteConfirmationComponent>,
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
