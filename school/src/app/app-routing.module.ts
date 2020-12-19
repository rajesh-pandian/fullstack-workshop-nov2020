import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: 'home',     loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'teachers', loadChildren: () => import('./features/teacher/teacher.module').then(m => m.TeacherModule) },
  { path: 'students', loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule) },
  { path: 'rooms',    loadChildren: () => import('./features/room/room.module').then(m => m.RoomModule) },
  { path: 'courses',  loadChildren: () => import('./features/course/course.module').then(m => m.CourseModule) },
  { path: 'studentCourses',  loadChildren: () => import('./features/student-course/student-course.module').then(m => m.StudentCourseModule) },

  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/teachers'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
