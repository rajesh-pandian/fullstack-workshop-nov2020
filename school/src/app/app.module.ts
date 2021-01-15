import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopMenuComponent } from './top-menu/top-menu.component';

import {MatSortModule} from "@angular/material/sort";
import {SharedModule} from "./shared/shared.module";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      SharedModule,

    ],
  entryComponents: [

  ],
  providers: [
     { provide: HTTP_INTERCEPTORS,  useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent],
  exports: [MatSortModule]
})
export class AppModule { }
