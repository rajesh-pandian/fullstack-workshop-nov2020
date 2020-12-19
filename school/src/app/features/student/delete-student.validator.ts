
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs/operators';
import {StudentCourseService} from "../../shared/services/student-course.service";


export function deleteStudentValidator(studentCourseService: StudentCourseService): AsyncValidatorFn {

  return (control: AbstractControl) => {

    const studentId = control.value;
    console.log(`in deleteStudentValidator and the value of the control is ${studentId}`);

    return studentCourseService.searchStudentCourseByStudentId(studentId)
      .pipe(
        map(studentCourses => {

          console.log('got some studentCourses ', studentCourses);

          const studentCourseWithStudent = studentCourses.find(
            crs => crs.student_id === studentId );

          return studentCourseWithStudent ? {studentInUse: true} : null;

        })
      );
  };
}
