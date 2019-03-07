import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/model/note';
import { UpdateNoteComponent } from 'src/app/component/update-note/update-note.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  dis: string;
  title: string;
}

@Component({
  selector: 'app-retrieve-notes',
  templateUrl: './retrieve-notes.component.html',
  styleUrls: ['./retrieve-notes.component.css']
})
export class AddnotesComponent implements OnInit {
  mytoken:String
  public notes: Note[] = [];
  constructor(private noteService: NoteService,
    private dialog:MatDialog,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.mytoken = localStorage.getItem('token')
    console.log("token", this.mytoken);
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
    }
    )
  }
  openDialog(notes): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '500px',
      data: notes

    });

    dialogRef.afterClosed().subscribe(result => {
      this.noteService.updateNote(notes,notes.id).subscribe(response => {
        console.log(response);
      },
        error => {
          console.log("error");
        })
      console.log('The dialog was closed');

    });
  }


  deleteNote(notes) {
    console.log(notes.id);
    this.noteService.removeNote(notes.id).subscribe(response => {
      this.snackBar.open('Note deleted successfully', 'OK', { duration: 2000 });
    }),
      error => { 
        console.log(error);
        this.snackBar.open('Note cannot be deleted', 'Error in note retrieval', { duration: 2000 });
      }
  }

  updateArchiveNote(notes) {
    notes.archive = 1;
    this.updateMethod(notes);
}


updateMethod(notes) {
  console.log("archive"+ notes.archive)
  this.noteService.updateNote(notes, notes.id).subscribe(response => {
    this.snackBar.open('Note successfully updated', 'OK', { duration: 2000 });
    console.log(response);
  })                                                                                                                                                                                                                                                              ,
    error => {
      console.log("error");
      this.snackBar.open('Denied in update', 'OK', { duration: 2000 });
    }
}

moveToTrash(notes) {
  notes.inTrash = 1;
  this.updateMethod(notes);
}

pinnedNotes(notes) {
  notes.pinned=1;
  this.updateMethod(notes);
}

}
  
