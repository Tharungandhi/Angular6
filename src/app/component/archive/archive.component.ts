import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { Note } from 'src/app/core/model/note';
import { AddlabelNotesComponent } from '../addlabel-notes/addlabel-notes.component';
import { label } from 'src/app/core/model/label';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  

  public grid = false;
  mytoken: string;
  public notes: Note[] = [];


  constructor(private noteService: NoteService,
    public snackBar: MatSnackBar,
    private keepHelperService: KeepHelperService) {

  }

  public ngOnInit() {
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
    },
      (error) => {
        console.log(error);
      })
  }

  public updateNoteToGrid(data) {
    this.updateMethod(data.note);
  }

}




