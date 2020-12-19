


import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs/operators';
import {CourseService} from "../../shared/services/course.service";

export function deleteTeacherValidator(courseService: CourseService): AsyncValidatorFn {

  return (control: AbstractControl) => {

    const teacherId = control.value;
    console.log(`in deleteTeacherValidator and the value of the control is ${teacherId}`);

    return courseService.getCoursesForTeacher(teacherId)
      .pipe(
        map(courses => {

          console.log('got some courses ', courses);

          const courseWithTeacher = courses.find(
            crs => crs.teacherId == teacherId );

          return courseWithTeacher ? {teacherInUse: true} : null;

        })
      );
  };
}
