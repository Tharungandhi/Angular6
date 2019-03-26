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

      getHeader() {
        var token = localStorage.getItem('token')
        const httpheaders = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'token': token
          })
        };
        return httpheaders;
    }

  retrieveNotes(token):Observable<any>
  {
    var httpheaders=this.getHeader();
    return this.http.getService(environment.note_url + 'retrievenote',httpheaders);
  }

  


  createNote(notes): Observable<any> {
    var httpheaders=this.getHeader();
    return this.http.postWithBody(`${environment.note_url}createnote`,notes, httpheaders);
  }

  removeNote(id): Observable<any> {
    var httpheaders=this.getHeader();
    return this.http.deleteService(`${environment.note_url}deletenote/`+id, httpheaders);
  }

  
   
   updateNote(notes, id) {
    var httpheaders=this.getHeader();
    return this.http.putService(`${environment.note_url}updatenote/`+id, notes, httpheaders)
    }
  


    retrieveLabels():Observable<any>
    {
      var httpheaders=this.getHeader();
          return this.http.getService(`${environment.note_url}retrievelabel/`,httpheaders);
    }

    createLabels(labels): Observable<any> {
      var httpheaders=this.getHeader();
      return this.http.labelCreateService(`${environment.note_url}createlabel/`,labels,httpheaders);
  }
  
    updateLabel(labels, id):Observable<any> {
      var httpheaders=this.getHeader();
      return this.http.putService(`${environment.note_url}updatelabel/`+ id, labels,httpheaders);
    }
  
    removeLabel(id):Observable<any> {
      var httpheaders=this.getHeader();
      return this.http.deleteService(`${environment.note_url}deletelabel/`+ id, httpheaders);
    }
  
    
    mapLabelTONote(noteId,label){
      var header = this.getHeader()
      // var noteId= note.id
      // var labelId=label.id
      return this.http.putService(`${environment.note_url}mapnotelabel/`+noteId,label, { observe: 'response' });
  }

  deletenotelabel(labelId,noteId){
    return  this.http.deleteService( `${environment.note_url}deletenotelabel/`,{
      params: {
         noteId: noteId,
         labelId:labelId
      },
      observe: 'response'
      }
      )      
    }

    createCollaborator(noteId, userId) {
      var httpheaders=this.getHeader();
      return this.http.postForCollaborator(`${environment.note_url}createcollaborator/`+noteId+'/'+userId,httpheaders);
    }
  
    removeCollaborateUser(noteId,userId)
    {
      return this.http.removeCollaborateUser(`${environment.note_url}removecollaborator/`+userId+'/'+noteId);
    }
  








    
    }


