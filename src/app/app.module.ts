import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import {AppMaterialModule} from './app-material.module';
import { HomepageComponent } from './component/homepage/homepage.component';
import { NoteComponent } from './component/note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomepageComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
