import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  
  public token = localStorage.getItem('token');
  public httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
};


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
      this.router.navigate(['/resetpassword'])
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

  

  public getImage(): Observable<any> {
    var token = localStorage.getItem('token')
    return this.http.getService(`${environment.note_url}uploadimage/`+ token, 1);
}


  public downloadImage():Observable<any> {
    return this.http.getService(environment.url + 'uploadimage', this.httpheaders);
  }

  public uploadImage(file): Observable<any> {
    var token = localStorage.getItem('token')
    const formdata = new FormData();
    formdata.append("file", file);
    return this.http.postForImage(environment.url + 'uploadimage/' + token, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
}
public removeImage()
{
  return this.http.deleteService(environment.url + 'uploadimage',this.httpheaders);
}
public verifyEmail(email):Observable<any>
{
  return this.http.getUserEmail(environment.url + 'verifyemail/'+email,this.httpheaders)
}
public getCollaborateUser(userId):Observable<any>
{
  return this.http.getCollaborateUser(environment.url + 'getcollaborateduser/'+userId);
}

public getUsers(): Observable<any> {
  return this.http.getService(environment.url + 'allusers', { observe: 'response' })
  }
}