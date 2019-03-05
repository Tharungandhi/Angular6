import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import {AppMaterialModule} from './app-material.module';
import { HomepageComponent } from './component/home-page/home-page.component';
import { NoteComponent } from './component/note/note.component';
import { ResetpasswordComponent } from './component/reset-password/reset-password.component';
import { ForgotpasswordComponent } from './component/forgot-password/forgot-password.component';
import { AddnotesComponent } from './component/retrieve-notes/retrieve-notes.component';
import { CreateNoteComponent } from './component/create-note/create-note.component';
import { UpdateNoteComponent } from './component/update-note/update-note.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { KeepHeaderComponent } from './component/keep-header/keep-header.component';
import { KeepSidebarComponent } from './component/keep-sidebar/keep-sidebar.component';
import { TrashComponent } from './component/trash/trash.component';
import { PinNotesComponent } from './component/pin-notes/pin-notes.component';


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
    ArchiveComponent,
    KeepHeaderComponent,
    KeepSidebarComponent,
    TrashComponent,
    PinNotesComponent    
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
