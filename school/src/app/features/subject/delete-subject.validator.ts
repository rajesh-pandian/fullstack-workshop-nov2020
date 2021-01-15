

import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs/operators';
import {CourseService} from "../../shared/services/course.service";


export function deleteSubjectValidator(courseService: CourseService): AsyncValidatorFn {

  return (control: AbstractControl) => {

    const subjectId = control.value;

    return courseService.countCoursesForSubject(subjectId)
      .pipe(
        map(coursesCount => {

          if (coursesCount && coursesCount > 0) {
            return {subjectInUse: true}
          } else {
            return null;
          }

        })
      );
  };
}
