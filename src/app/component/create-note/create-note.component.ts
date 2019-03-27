import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';



@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
//  @Input() newNote
  @Output()  createEvent= new EventEmitter();
  public showHeader = false;
  createNoteForm: FormGroup;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;
  public mytoken = localStorage.getItem('token');


  constructor(
    private formBuilder: FormBuilder,  
  private noteService: NoteService, 
  private snackBar: MatSnackBar,
    private dialog:MatDialog,
    ) { }

  ngOnInit() {
this.createNoteForm = this.formBuilder.group({
  title: ['',Validators.required],
  discription: ['',Validators.required]
});
}


get f() { return this.createNoteForm.controls; }

public onSubmit(note) {
this.submitted = true;
if (this.createNoteForm.invalid) {
  return;
}
// if (this.createNoteForm.value.title === "" && this.createNoteForm.value.discription === "") {
//   return;
// }
// console.log(this.mytoken);
// console.log(note);
this.noteService.createNote(note).subscribe(response => {
  this.createEvent.emit(true);
  console.log(response);
  this.snackBar.open("Note has been created successfully", "OK", {
    duration: 2000
  });
})
}


}




