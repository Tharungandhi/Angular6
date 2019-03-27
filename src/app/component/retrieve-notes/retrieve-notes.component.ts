import { Component, OnInit, Output } from '@angular/core';
import {MatDialog} from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/model/note';
import { MatSnackBar } from '@angular/material';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';

export interface DialogData {
  dis: string;
  title: string; 
}

@Component({
  selector: 'app-retrieve-notes',
  templateUrl: './retrieve-notes.component.html',
  styleUrls: ['./retrieve-notes.component.scss']
})
export class RetrievenotesComponent implements OnInit {
  public grid = false;
  mytoken: string;
  public notes: Note[] = [];


  constructor(private noteService: NoteService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private keepHelperService : KeepHelperService) {

  }

  ngOnInit() {
    this.getNotes();
    this.keepHelperService.getTheme().subscribe((resp) =>
      this.grid = resp
);
  }

 public  getNotes() {
    this.mytoken = localStorage.getItem('token')
    console.log("token", this.mytoken);
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;

    }
    )
  }
 public onClickUpdate(data) {
    this.updateMethod(data.notes);
  }

  public refresh(event) {
    if (event) {
      this.getNotes();
    }
  }

  public updateMethod(notes) {
    this.noteService.updateNote(notes, notes.id).subscribe(response => {
      this.getNotes();
      console.log(response);
      
    }, (error) => console.log(error));
  }


  public updateNoteToGrid(data) {
    this.updateMethod(data.notes);
}
}
  


  
