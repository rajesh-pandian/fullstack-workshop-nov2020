
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs/operators';
import {StudentCourseService} from "../../shared/services/student-course.service";


export function deleteCourseValidator(studentCourseService: StudentCourseService): AsyncValidatorFn {

  return (control: AbstractControl) => {

    const courseId = control.value;
    console.log(`in deleteCourseValidator and the value of the control is ${courseId}`);

    return studentCourseService.searchStudentCourseByCourseId(courseId)
      .pipe(
        map(studentCourses => {

          console.log('got some studentCourses ', studentCourses);

          const studentCourseWithStudent = studentCourses.find(
            crs => crs.course_id === courseId );

          return studentCourseWithStudent ? {courseInUse: true} : null;

        })
      );
  };
}
