import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DelConDialogData} from "../../../../shared/models/deleteComfirmation.model";
import {deleteStudentValidator} from "../../delete-student.validator";
import {StudentCourseService} from "../../../../shared/services/student-course.service";

@Component({
  selector: 'app-student-delete-confirmation',
  templateUrl: './student-delete-confirmation.component.html',
  styleUrls: ['./student-delete-confirmation.component.scss']
})
export class StudentDeleteConfirmationComponent implements OnInit {

  dialogData: DelConDialogData;
  title:string;
  message:string;

  studentId = this.fb.control(
    this.data.id, {
      validators: [Validators.required],
      asyncValidators: [deleteStudentValidator(this.studentCourseService)],
      updateOn: "change"
    }
  )

  constructor(
    private router: Router,
    private studentCourseService: StudentCourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentDeleteConfirmationComponent>,
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
