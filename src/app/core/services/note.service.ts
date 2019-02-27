import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class NoteService {


  constructor(private httpUtil: HttpService, private router: Router, public snackBar: MatSnackBar) { }

  retrieveNotes(token):Observable<any>
  {
    var httpheaders = {
      headers:new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      })
    };
    return this.httpUtil.getService(environment.note_url + 'retrievenote',httpheaders);
  }

  save(note) {
    var token = localStorage.getItem('token')
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //application/x-www-form-urlencoded
        'token': token
      })
    };
    this.httpUtil.postWithBody(environment.note_url + 'createnote', note, httpheaders).subscribe(response => {
      console.log(response);
    }, (error) => console.log(error));
  }




}
