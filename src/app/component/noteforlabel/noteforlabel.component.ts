import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/note.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';

@Component({
  selector: 'app-noteforlabel',
  templateUrl: './noteforlabel.component.html',
  styleUrls: ['./noteforlabel.component.scss']
})
export class NoteforlabelComponent implements OnInit {

  public grid = false;
  public notes: Note[] = [];
  public labelNote: Note[] = [];
  public label;
  public token=localStorage.getItem('token');


  constructor(private noteService: NoteService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog, private keepHelperService:KeepHelperService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.label = params['labelName'];
      this.keepHelperService.getTheme().subscribe((resp) =>
        this.grid = resp
      );
      this.getNotes();
    });
    this.keepHelperService.getTheme().subscribe((resp) =>
    this.grid = resp
  );
  }

  public updateNote(data) {
    this.updateMethod(data.notes);
  }

  public updateMethod(notes) {
    this.noteService.updateNote(notes, notes.id).subscribe(response => {
      this.getNotes();
    },
      error => {
        console.log("error");
      })
  }

  public getNotes() {
    this.noteService.retrieveNotes(this.token).subscribe(newNote => {
      this.notes = newNote;
      this.filterLabel(this.notes);
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

  public filterLabel(notes) {
    this.labelNote.length = 0;
    notes.filter((notes) => notes.labels.filter((label) => {
      if (this.label === label.labelName && !notes.inTrash) {
        this.labelNote.push(notes);
      }
    }))
    return this.labelNote;
}


public updateNoteToGrid(data) {
  this.updateMethod(data.note);
}
}
