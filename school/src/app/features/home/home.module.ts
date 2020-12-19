import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {HomeComponent} from "./components/home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {RoomComponent} from "../room/components/room/room.component";

const routes: Routes = [
  { path: '', component: HomeComponent }
];


@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
