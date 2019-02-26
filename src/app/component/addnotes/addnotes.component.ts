import { Component, OnInit } from '@angular/core';

import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/model/note';


@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.css']
})
export class AddnotesComponent implements OnInit {
  public mytoken = localStorage.getItem('token')
  public notes: Note[] = [];
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    console.log("token", this.mytoken);
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
    }
    )
  }

}
