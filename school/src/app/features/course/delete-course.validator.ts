
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs/operators';
import {StudentCourseService} from "../../shared/services/student-course.service";


export function deleteCourseValidator(studentCourseService: StudentCourseService): AsyncValidatorFn {

  return (control: AbstractControl) => {

    const courseId = control.value;

    return studentCourseService.searchStudentCourseByCourseId(courseId)
      .pipe(
        map(studentCourses => {

          if(studentCourses && studentCourses.length > 0) {
            return {courseInUse: true}
          } else {
            return null;
          }
        })
      );
  };
}
