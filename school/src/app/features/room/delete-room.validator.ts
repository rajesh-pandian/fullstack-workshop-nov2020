

import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs/operators';
import {CourseService} from "../../shared/services/course.service";


export function deleteRoomValidator(courseService: CourseService): AsyncValidatorFn {

  return (control: AbstractControl) => {

    const roomId = control.value;
    console.log(`in deleteTeacherValidator and the value of the control is ${roomId}`);

    return courseService.getCoursesForRoom(roomId)
      .pipe(
        map(rooms => {

          console.log('got some rooms ', rooms);

          const courseWithRoom = rooms.find(
            crs => crs.roomId == roomId );

          return courseWithRoom ? {roomInUse: true} : null;

        })
      );
  };
}
