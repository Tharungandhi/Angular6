import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { RetrievenotesComponent } from '../retrieve-notes/retrieve-notes.component';



@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  @Input() newNote
  @Output()  eventEmitter= new EventEmitter();
  public showHeader = false;
  createNoteForm: FormGroup;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;
  public mytoken = localStorage.getItem('token');
  public colors=['#FFE4C4','#F8F8FF', '#5F9EA0','#778899','#00FFFF',
  '#ADFF2F', '#FF69B4', '#F08080', '#4682B4'];

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
if (this.createNoteForm.value.title === "" && this.createNoteForm.value.discription === "") {
  return;
}
console.log(this.mytoken);
console.log(note);
this.noteService.createNote(note).subscribe(response => {
  this.eventEmitter.emit(true);
  this.snackBar.open("Note has been created successfully", "OK", {
    duration: 2000
  });
})
}


public pinned(notes) {
  notes.pinned=1;
  this.updateMethod(notes);
}


public updateMethod(notes) {
  this.noteService.updateNote(notes, notes.id).subscribe(response => {
    console.log(response);
  },
    error => {
      console.log("error");
    })
}



collaborator(notes)
{
  const dialogRef = this.dialog.open(CollaboratorComponent, {
    width: '500px',
    data: notes
  });
  dialogRef.afterClosed().subscribe(result => {
    const data = { notes }
    this.eventEmitter.emit(data);
    console.log('The dialog was closed');
  });
}


Colourupdate(data) {
  this.eventEmitter.emit(data);
}

// onClickUpdate(data) {
// this.addNotes.updateMethod(data.notes);
// }

}




