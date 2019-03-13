import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Note } from 'src/app/core/model/note';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';

@Component({
  selector: 'app-search-note',
  templateUrl: './search-note.component.html',
  styleUrls: ['./search-note.component.scss']
})
export class SearchNoteComponent implements OnInit {

  public notes: Note[] = [];
  public grid = false;
  public searchString = '';
  public mytoken=localStorage.getItem('token');

  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog, private keepHelperService: KeepHelperService) { }

  ngOnInit() {
    this.getNotes();
    this.keepHelperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
    this.keepHelperService.getSearchNote().subscribe((resp) =>
      this.searchString = resp);
  }
  
  public getNotes() {
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
}
  public onUpdateNote(data) {
    this.updateMethod(data.note);
  }

  updateMethod(note) {
    this.noteService.updateNote(note, note.id).subscribe(response => {
      this.getNotes();
    },
      error => {
        console.log("error");
      })
  }

 

}
