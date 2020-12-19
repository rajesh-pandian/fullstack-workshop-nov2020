import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Component, OnInit, Inject, AfterViewInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DelConDialogData} from "../../../../shared/models/deleteComfirmation.model";
import {StudentCourseService} from "../../../../shared/services/student-course.service";
import {deleteCourseValidator} from "../../delete-course.validator";

@Component({
  selector: 'app-course-delete-confirmation',
  templateUrl: './course-delete-confirmation.component.html',
  styleUrls: ['./course-delete-confirmation.component.scss']
})
export class CourseDeleteConfirmationComponent implements OnInit {

  dialogData: DelConDialogData;
  title:string;
  message:string;

  courseId = this.fb.control(
    this.data.id, {
      validators: [Validators.required],
      asyncValidators: [deleteCourseValidator(this.studentCourseService)],
      updateOn: "change"
    }
  )

  constructor(
    private router: Router,
    private studentCourseService: StudentCourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseDeleteConfirmationComponent>,
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
