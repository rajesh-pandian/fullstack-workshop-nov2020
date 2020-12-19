import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Component, OnInit, Inject, AfterViewInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DelConDialogData} from "../../../../shared/models/deleteComfirmation.model";
import {deleteTeacherValidator} from "../../delete-teacher.validator";
import {CourseService} from "../../../../shared/services/course.service";


@Component({
  selector: 'app-teacher-delete-confirmation',
  templateUrl: './teacher-delete-confirmation.component.html',
  styleUrls: ['./teacher-delete-confirmation.component.scss']
})
export class TeacherDeleteConfirmationComponent implements OnInit {

  dialogData: DelConDialogData;
  title:string;
  message:string;

  teacherId = this.fb.control(
    this.data.id, {
      validators: [Validators.required],
      asyncValidators: [deleteTeacherValidator(this.courseService)],
      updateOn: "change"
    }
  )

  constructor(
    private router: Router,
    private courseService: CourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TeacherDeleteConfirmationComponent>,
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
