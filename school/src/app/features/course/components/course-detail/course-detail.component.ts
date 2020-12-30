import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {forkJoin, Observable} from "rxjs";
import {Mode} from "../../../../shared/models/enums";
import {CourseResolved} from "../../../../shared/models/course.model";
import {TeacherService} from "../../../../shared/services/teacher.service";
import {CourseTypeService} from "../../../../shared/services/courseType.service";
import {Teacher} from "../../../../shared/models/teacher.model";
import {StudentService} from "../../../../shared/services/student.service";
import {RoomService} from "../../../../shared/services/room.service";
import {Student} from "../../../../shared/models/student.model";
import {CourseType} from "../../../../shared/models/courseType.model";
import {Room} from "../../../../shared/models/room.model";


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  instruction = "Add Course";
  mode = Mode.create;
  form: FormGroup;
  course: CourseResolved;
  modeEnum = Mode;

  teachers$: Observable<Teacher[]>;
  teachers: Teacher[] = [];

  student$: Observable<Student[]>
  students: Student[] = [];

  room$: Observable<Room[]>;
  rooms: Room[] = [];

  courseType$: Observable<CourseType[]>
  courseTypes: CourseType[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<CourseDetailComponent>,
              private studentService: StudentService,
              private teacherService: TeacherService,
              private roomService: RoomService,
              private courseTypeService: CourseTypeService) {

    this.course = data['course'];
    let defName = '';
    let defDescription = '';
    let defTeacherId = undefined;
    let defRoomId = undefined;
    let defSubjectId = undefined;


    if(data.edit == true) {
      this.instruction = "Edit Course";
      this.mode = Mode.edit;
      defName = this.course.name;
      defDescription = this.course.description;
      defTeacherId = this.course.teacherId;
      defRoomId = this.course.roomId;
      defSubjectId = this.course.subjectId;
    }

    this.form = fb.group({
      name: [defName, Validators.required],
      description: [defDescription, Validators.required],
      teacherId: [defTeacherId, Validators.required],
      roomId: [defRoomId, Validators.required],
      subjectId: [defSubjectId, Validators.required]
    })

  }

  ngOnInit() {
    this.teachers$ = this.teacherService.getTeachers();
    this.student$ = this.studentService.getStudents();
    this.room$ = this.roomService.getRooms();
    this.courseType$ = this.courseTypeService.getCourseTypes();

    forkJoin([this.teachers$, this.student$, this.room$, this.courseType$])
      .subscribe(results => {
        [this.teachers, this.students, this.rooms, this.courseTypes] = results;
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
