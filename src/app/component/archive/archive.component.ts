import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { Note } from 'src/app/core/model/note';
import { AddlabelNotesComponent } from '../addlabel-notes/addlabel-notes.component';
import { label } from 'src/app/core/model/label';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  public mytoken = localStorage.getItem('token');
  public archiveList=[];
  public notes: Note[] = [];
  public label:label[]=[];


  constructor(private noteService: NoteService, public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  
  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

  openDialog(notes): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '500px',
      data: notes
    });
    dialogRef.afterClosed().subscribe(result => {
      this.noteService.updateNote(notes, notes.id).subscribe(response => {
        console.log(response);
      },
        error => {
          console.log("error");
        })
      console.log('The dialog was closed');
    });
  }

  updateMethod(notes) {
    this.noteService.updateNote(notes, notes.id).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })
  }

  

  updateArchiveNote(notes) {
    notes.archive = 0;
    this.updateMethod(notes);
  }



moveToTrash(notes) {
  notes.inTrash = 1;
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




