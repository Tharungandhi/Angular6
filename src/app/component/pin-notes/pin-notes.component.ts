import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { Note } from 'src/app/core/model/note';
import { AddlabelNotesComponent } from '../addlabel-notes/addlabel-notes.component';
import { label } from 'src/app/core/model/label';

@Component({
  selector: 'app-pin-notes',
  templateUrl: './pin-notes.component.html',
  styleUrls: ['./pin-notes.component.css']
})
export class PinNotesComponent implements OnInit {
  public notes: Note[] = [];
  public label:label[]=[];
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

  updateMethod(notes) {
    this.noteService.updateNote(notes, notes.id).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })
  }
  
  pinnedNotes(notes) {
    notes.pinned=0;
    this.updateMethod(notes);
}

moveToTrash(notes) {
  notes.inTrash = 1;
  this.updateMethod(notes);
}

updateArchiveNote(notes) {
  notes.archive=1;
  notes.pinned=0;
  this.updateMethod(notes);
}
openDialogLabels(notes): void {
  const dialogRef = this.dialog.open(AddlabelNotesComponent, {
    width: '500px',
    data: notes

  });
console.log(dialogRef)
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.label)
});
}
}
