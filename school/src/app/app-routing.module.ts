import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./shared/guards/auth.guard";


const routes: Routes = [

  { path: 'home',     loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'signup',   loadChildren: () => import('./features/signup/signup.module').then(m => m.SignupModule) },
  { path: 'login',    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: 'teachers', loadChildren: () => import('./features/teacher/teacher.module').then(m => m.TeacherModule) },
  { path: 'students', loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule) },
  { path: 'rooms',    loadChildren: () => import('./features/room/room.module').then(m => m.RoomModule) },
  { path: 'courses',  loadChildren: () => import('./features/course/course.module').then(m => m.CourseModule) },
  { path: 'studentCourses',  loadChildren: () => import('./features/student-course/student-course.module').then(m => m.StudentCourseModule) },
  { path: 'subjects',  loadChildren: () => import('./features/subject/subject.module').then(m => m.SubjectModule), canActivate: [AuthGuard]  },

  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/teachers'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
