import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/model/note';

@Component({
  selector: 'app-trash-dialog-box',
  templateUrl: './trash-dialog-box.component.html',
  styleUrls: ['./trash-dialog-box.component.scss']
})
export class TrashDialogBoxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TrashDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note, private noteService: NoteService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  deleteNote(note) {
    this.noteService.removeNote(note.id).subscribe(response => {
      this.snackBar.open("deleted Note", "OK", { duration: 2000 });
    }), error => {
      this.snackBar.open("error to delete note", "error", { duration: 2000 });
    }
  }

  restore(note) {
    note.inTrash = 0;
    this.noteService.updateNote(note, note.id).subscribe(response => {
      console.log(response);
      this.snackBar.open("Restored", "Ok", { duration: 2000 });
    },
      error => {
        console.log("error");
      })
}
}
