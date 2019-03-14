import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:8082/user/profile/uploadpicture', formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.http.request(req);
  }

}