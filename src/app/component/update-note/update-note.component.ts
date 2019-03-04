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
  private service: NoteService,
  private formBuilder:FormBuilder) {}

  ngOnInit() {
    this.updateNoteForm=this.formBuilder.group({});
    
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }
  updateNote(note,id) {
    console.log(note);
    this.service.updateNote(note,id)
  }
        





 

//   ngOnInit() {
//     this.updateNoteForm = this.formBuilder.group({
//     });
//   }

//   closeClick(title, description) {
//     var note = {
//       'title': title,
//       'description': description,
//       'noteId': this.note.noteId
//     }

//     this.noteService.updateNote(note, this.token).subscribe(response => {
//       console.log(response);
//     },
//       error => {
//         console.log('error');
//       });
//   }
//   // update() {
//   //   this.dialogRef.close();
//   // }

}