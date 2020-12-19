import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {forkJoin, Observable} from "rxjs";
import {CourseService} from "../../../../shared/services/course.service";
import {Mode} from "../../../../shared/models/enums";
import {StudentService} from "../../../../shared/services/student.service";
import {Course, StudentCourse} from "../../../../shared/models/course.model";
import {Student} from "../../../../shared/models/student.model";


@Component({
  selector: 'app-student-course-detail',
  templateUrl: './student-course-detail.component.html',
  styleUrls: ['./student-course-detail.component.scss']
})
export class StudentCourseDetailComponent implements OnInit {

  instruction = "Add Student-Course";
  mode = Mode.create;
  form: FormGroup;
  studentCourse: StudentCourse;
  modeEnum = Mode;

  courses$: Observable<Course[]>;
  courses: Course[] = [];

  student$: Observable<Student[]>
  students: Student[] = [];



  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<StudentCourseDetailComponent>,
              private studentService: StudentService,
              private courseService: CourseService) {


    this.studentCourse = data['studentCourse'];

    let studentIdDefVal = undefined;
    let courseIdDefVal = undefined;


    if(data.edit == true) {
      this.instruction = "Edit Student-Course";
      this.mode = Mode.edit;
      studentIdDefVal = this.studentCourse.studentId;
      courseIdDefVal = this.studentCourse.courseId;
    }

    this.form = fb.group({
      studentId: [studentIdDefVal, Validators.required],
      courseId: [courseIdDefVal, Validators.required],
    })

  }

  ngOnInit() {

    this.courses$ = this.courseService.getCourses();
    this.student$ = this.studentService.getStudents();

    forkJoin([this.courses$, this.student$])
      .subscribe(results => {
        [this.courses, this.students] = results;
      })
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
