import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService,private router: Router) { }

  login(user) {
    this.http.postService(environment.url + 'login', user).subscribe(response => {
      console.log(response);
      if (response.status == 200) {
        console.log("login in");
        localStorage.setItem('Autorization', response.headers.get('token'));
        this.router.navigate(['/homepage']);
       
      }
      else {
        console.log("login Unsuccessfull");
      }
    });
  }

  register(user) {
    this.http.postService(environment.url + 'register', user).subscribe(response => {
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
}