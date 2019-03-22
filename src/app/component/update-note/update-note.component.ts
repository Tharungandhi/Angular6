import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {NoteService} from 'src/app/core/services/note.service';
import { DialogData } from '../retrieve-notes/retrieve-notes.component';



@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {
 updateNoteForm:FormGroup;
 public mytoken = localStorage.getItem('token'); 
 

 constructor(
  public dialogRef: MatDialogRef<UpdateNoteComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData,
  private noteService: NoteService,
  private formBuilder:FormBuilder) {}

  ngOnInit() {
    this.updateNoteForm=this.formBuilder.group({});
  
  }
  

  updateNote(notes,id) {
    console.log(notes);
    this.noteService.updateNote(notes,id).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })
    this.dialogRef.close();
  }}