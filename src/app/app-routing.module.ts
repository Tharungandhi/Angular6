import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { HomepageComponent } from './component/home-page/home-page.component';
import { ResetpasswordComponent } from './component/reset-password/reset-password.component';
import { ForgotpasswordComponent } from './component/forgot-password/forgot-password.component';
import { RetrievenotesComponent } from './component/retrieve-notes/retrieve-notes.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { TrashComponent } from './component/trash/trash.component';
import { PinNotesComponent } from './component/pin-notes/pin-notes.component';
import { SearchNoteComponent } from './component/search-note/search-note.component';
import { UploadImageComponent } from './component/upload-image/upload-image.component';
import { AuthGardGuard } from './guard/auth-gard.guard';
import { RemainderComponent } from './component/remainder/remainder.component';


const appRoutes: Routes = [
 
  { path: 'login', component: LoginComponent },
  { path:'forgotpassword', component: ForgotpasswordComponent},
  { path:'resetpassword/:id' , component:ResetpasswordComponent},
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'homepage', component: HomepageComponent,
    canActivate: [AuthGardGuard],
    children:
      [
        { path: 'retrievenotes' , component :RetrievenotesComponent },
        { path:'archive' ,component: ArchiveComponent},
        { path: 'trash',component:TrashComponent},
        { path:'pin-notes',component:PinNotesComponent},
        {path:'search-note',component:SearchNoteComponent},
        { path:'image', component:UploadImageComponent},
        {path:'remainder' ,component:RemainderComponent},
        {
          path: '',
          redirectTo: 'retrievenotes',
          pathMatch: 'full'
        }
      ]
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
