import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/model/note';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';

@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.scss']
})
export class RemainderComponent implements OnInit {

  public notes: Note[] = [];
  public grid = false;
  public message='archive';
  public token=localStorage.getItem('token');

  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog, private keepHelperService: KeepHelperService) { }

  ngOnInit() {
    this.getNotes();
    this.keepHelperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
    console.log(this.message)
  }

  public refresh() {
    this.getNotes();
  }

  public onUpdateNote(data) {
    this.updateMethod(data.notes);
  }

  updateMethod(notes) {
    this.noteService.updateNote(notes, notes.id).subscribe(response => {
      this.getNotes();
      console.log(response);
    },
    (error) => console.log(error));
  }

  public getNotes() {
    this.noteService.retrieveNotes(this.token).subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

}
