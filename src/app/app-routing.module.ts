import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { AddnotesComponent } from './component/addnotes/addnotes.component';

const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path:'forgotpassword', component: ForgotpasswordComponent},
  { path:'resetpassword/:id' , component:ResetpasswordComponent},
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'homepage', component: HomepageComponent,
    children:
      [
        { path: '' , component :AddnotesComponent }
      
       
     
      ]
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
