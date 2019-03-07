import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar,MatDialog } from '@angular/material';
import { HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class NoteService {
public token=localStorage.getItem('token');

  constructor(private http: HttpService,
      public snackBar: MatSnackBar) { }



  retrieveNotes(token):Observable<any>
  {
    var httpheaders = {
      headers:new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      })
    };
    return this.http.getService(environment.note_url + 'retrievenote',httpheaders);
  }

  


  createNote(notes): Observable<any> {
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.token
      })
    };
    return this.http.postWithBody(`${environment.note_url}createnote`,notes, httpheaders);
  }

  removeNote(id): Observable<any> {
 
  var httpheaders={
   headers:new HttpHeaders({
     'Content-Type':'application/json',
     'token':this.token
   })
  };
    return this.http.deleteService(`${environment.note_url}deletenote/`+id, httpheaders);
  }

  
   
  updateNote(notes, id) {
    var httpheaders = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'token':this.token
    })
    };
    return this.http.putService(`${environment.note_url}updatenote/`+id, notes, httpheaders)
    }
  


    retrieveLabels():Observable<any>
    {
      var httpheaders = {
            headers:new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              'token':this.token
            })
          };
          return this.http.getService(`${environment.note_url}retrievelabel/`,httpheaders);
    }

    createLabels(labels): Observable<any> {
      var httpheaders = {
        headers:new HttpHeaders({
          'Content-Type': 'application/json',
          'token':this.token
        })
      };
      return this.http.labelCreateService(`${environment.note_url}createlabel/`,labels,httpheaders);
  }
  
    updateLabel(label, id):Observable<any> {
      var httpheaders = {
        headers:new HttpHeaders({
          'Content-Type': 'application/json',
          'token':this.token
        })
      };
      return this.http.putService(`${environment.note_url}updatelabel/`+ id, label,httpheaders);
    }
  
    removeLabel(id):Observable<any> {
      var httpheaders = {
        headers:new HttpHeaders({
          'Content-Type': 'application/json',
          'token':this.token
        })
      };
      return this.http.deleteService(`${environment.note_url}deletelabel/`+ id, httpheaders);
    }
  
    









    
    }


