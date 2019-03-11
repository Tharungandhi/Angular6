import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/model/note';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';


@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  public notes: Note[] = [];
  public mytoken=localStorage.getItem('token');

  constructor(private noteService: NoteService,
    public snackBar:MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.getNotes();
  }


  openDialog(notes): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '500px',
      data: notes

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  getNotes() {
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
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


  updateMethod(notes) {
    this.noteService.updateNote(notes, notes.id).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })
  }



  restore(notes)
  {
    notes.inTrash=0;
    console.log(notes);
    this.noteService.updateNote(notes,notes.id).subscribe(response => {
      console.log(response);
      this.snackBar.open("Restored", "Ok", { duration: 2000 });
    },
      error => {
        console.log("error");
      })
}
onClickUpdate(data) {
  this.updateMethod(data.notes);
}


refresh(event) {
  if (event) {
    this.getNotes();
  }
}
}
