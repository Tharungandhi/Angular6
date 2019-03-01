import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import {AppMaterialModule} from './app-material.module';
import { HomepageComponent } from './component/homepage/homepage.component';
import { NoteComponent } from './component/note/note.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { AddnotesComponent } from './component/addnotes/addnotes.component';
import { CreateNoteComponent } from './component/create-note/create-note.component';
import { UpdateNoteComponent } from './component/update-note/update-note.component';
import { ArchiveComponent } from './component/archive/archive.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomepageComponent,
    NoteComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    AddnotesComponent,
    CreateNoteComponent,
    UpdateNoteComponent,
    ArchiveComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule
    
  ],
   entryComponents:[
    UpdateNoteComponent
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
