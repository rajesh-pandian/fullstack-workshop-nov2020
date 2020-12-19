import { NgModule } from '@angular/core';
import {RoomComponent} from "./components/room/room.component";
import {RoomDetailComponent} from "./components/room-detail/room-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { RoomDeleteConfirmationComponent } from './components/room-delete-confirmation/room-delete-confirmation.component';

const routes: Routes = [
  { path: '', component: RoomComponent }
];

@NgModule({
  declarations: [
    RoomComponent,
    RoomDetailComponent,
    RoomDeleteConfirmationComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    RoomDetailComponent,
    RoomDeleteConfirmationComponent
  ]
})
export class RoomModule { }
