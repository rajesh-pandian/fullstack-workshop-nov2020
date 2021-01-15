import { NgModule } from '@angular/core';
import { SignupComponent } from './components/signup/signup.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  { path: '', component: SignupComponent }
];

@NgModule({
  declarations: [SignupComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SignupModule { }
