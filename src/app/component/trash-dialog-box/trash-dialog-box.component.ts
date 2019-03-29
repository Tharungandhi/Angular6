import { Component, OnInit, Inject, Output } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/model/note';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-trash-dialog-box',
  templateUrl: './trash-dialog-box.component.html',
  styleUrls: ['./trash-dialog-box.component.scss']
})
export class TrashDialogBoxComponent implements OnInit {
  public notes: Note[] = [];
  @Output() eventEmitter= new EventEmitter();
  public mytoken=localStorage.getItem('token');

  constructor(public dialogRef: MatDialogRef<TrashDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note, private noteService: NoteService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getNotes();
  }



  public  getNotes() {
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
      console.log(this.notes)
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }
  public deleteNote(notes) {
    console.log(notes.id);
    this.noteService.removeNote(notes.id).subscribe(response => {
      this.snackBar.open('Note deleted successfully', 'OK', { duration: 2000 });
      this.refresh(event);
    }),
      error => { 
        console.log(error);
        this.snackBar.open('Note cannot be deleted', 'Error in note retrieval', { duration: 2000 });
      }
  }
  public refresh(event) {
    if (event) {
      this.getNotes();
    }
  }


  public restore(notes)
  {
    notes.inTrash=0;
    console.log(notes);
    this.noteService.updateNote(notes,notes.id).subscribe(response => {
      console.log(response);
      this.refresh(event);
      this.snackBar.open("Restored", "Ok", { duration: 2000 });
    },
      error => {
        console.log("error");
      })

}



}
