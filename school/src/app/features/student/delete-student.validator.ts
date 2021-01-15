
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs/operators';
import {StudentCourseService} from "../../shared/services/student-course.service";


export function deleteStudentValidator(studentCourseService: StudentCourseService): AsyncValidatorFn {

  return (control: AbstractControl) => {

    const studentId = control.value;

    return studentCourseService.searchStudentCourseByStudentId(studentId)
      .pipe(
        map(studentCoursesWithThisStudent => {

          if (studentCoursesWithThisStudent && studentCoursesWithThisStudent.length > 0) {
            return {studentInUse: true};
          } else {
            return null;
          }
        })
      );
  };
}
