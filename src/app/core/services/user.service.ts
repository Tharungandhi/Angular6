import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService,private router: Router ,public snackBar: MatSnackBar ) { }

  login(user): any {
    return this.http.postService(environment.url + 'login', user);
  }

  register(user) {
   return this.http.postService(environment.url + 'register', user).subscribe(response => {
      console.log(response);
      if (response.status == 200) {
        console.log(response.body.headers);
        this.router.navigate(['/login']);
        localStorage.setItem('Authorization', response.body.headers);
      }
      else {
        console.log(response.body.header);
      }
    });
  }

  forgotpassword(user){
  return this.http.postService(environment.url + 'forgotpassword',user).subscribe(response =>{
    console.log(response);
    if(response.status == 200)
    {
      console.log('email send succesfully');
      this.router.navigate(['/re'])
    }
    else {
      console.log(response.body.header);
    }
  });
}


forgotPassword(user) {
    this.http.postService(environment.url + 'forgotpassword', user).subscribe(response => {
      console.log("reset password mail sent to your email");
    }, error => {
      this.snackBar.open("error", "please enter the registered email", { duration: 2000 })
    });
  }

  resetPassword(user, id) {
    this.http.putService(environment.url + 'resetpassword/'+id, user, id).subscribe(response => {
      this.router.navigate(['/login']);
      this.snackBar.open("sucess", "password reset successfully", {
        duration: 2000
      });
      console.log("reset successful", response);
    },
      error => {
        this.snackBar.open("error", "error to reset", { duration: 2000 })
        console.log("error to reset", error);
      }
    );
  }



}