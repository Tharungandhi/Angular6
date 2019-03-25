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
import { RetrievenotesComponent } from './component/retrieve-notes/retrieve-notes.component';
import { CreateNoteComponent } from './component/create-note/create-note.component';
import { UpdateNoteComponent } from './component/update-note/update-note.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { KeepHeaderComponent } from './component/keep-header/keep-header.component';
import { KeepSidebarComponent } from './component/keep-sidebar/keep-sidebar.component';
import { TrashComponent } from './component/trash/trash.component';
import { PinNotesComponent } from './component/pin-notes/pin-notes.component';
import { EditLabelComponent } from './component/edit-label/edit-label.component';
import { NoteFilterPipe } from './core/pipe/note-filter.pipe';
import { AddlabelNotesComponent } from './component/addlabel-notes/addlabel-notes.component';
import { SearchNoteComponent } from './component/search-note/search-note.component';
import { SearchFilterPipe } from './core/pipe/search-note-filter.pipe';
import { UploadImageComponent } from './component/upload-image/upload-image.component';
import { LabelFilterPipe } from './core/pipe/label-filter.pipe';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { ColourComponent } from './component/colour/colour.component';
import { CollaborateSearchPipe } from './core/pipe/collaborate-search.pipe';
import { RemainderComponent } from './component/remainder/remainder.component';
import { AuthGardGuard } from './guard/auth-gard.guard';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomepageComponent,
    NoteComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    RetrievenotesComponent,
    CreateNoteComponent,
    UpdateNoteComponent,
    ArchiveComponent,
    KeepHeaderComponent,
    KeepSidebarComponent,
    TrashComponent,
    PinNotesComponent,
    EditLabelComponent,
    NoteFilterPipe,
    AddlabelNotesComponent,
    SearchNoteComponent,
    SearchFilterPipe,
    UploadImageComponent,
    LabelFilterPipe,
    CollaboratorComponent,
    ColourComponent,
    CollaborateSearchPipe,
    RemainderComponent
    

        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule
    
  ],
   entryComponents:[
    UpdateNoteComponent,
    EditLabelComponent,
    AddlabelNotesComponent,
    CollaboratorComponent
   ],
  providers: [RetrievenotesComponent,
    AuthGardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
