


import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs/operators';
import {CourseService} from "../../shared/services/course.service";

export function deleteTeacherValidator(courseService: CourseService): AsyncValidatorFn {

  return (control: AbstractControl) => {

    const teacherId = control.value;

    return courseService.countCoursesForTeacher(teacherId)
      .pipe(
        map(coursesForThisTeacher => {

          if (coursesForThisTeacher && coursesForThisTeacher > 0) {
            return {teacherInUse: true};
          } else {
            return null;
          }
        })
      );
  };
}
