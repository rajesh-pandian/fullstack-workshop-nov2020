

import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs/operators';
import {CourseService} from "../../shared/services/course.service";


export function deleteRoomValidator(courseService: CourseService): AsyncValidatorFn {

  return (control: AbstractControl) => {

    const roomId = control.value;

    return courseService.getCoursesForRoom(roomId)
      .pipe(
        map(coursesUsingThisRoom => {

          if (coursesUsingThisRoom && coursesUsingThisRoom.length > 0) {
            return {roomInUse: true};
          } else {
            return null;
          }
        })
      );
  };
}
