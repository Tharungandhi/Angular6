import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { HttpService } from 'src/app/core/services/http.service';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  public showHeader = true;
  createNoteForm: FormGroup;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;
  public mytoken = localStorage.getItem('token');


  constructor(private NoteService: NoteService,
    private formBuilder: FormBuilder, private route: ActivatedRoute, private http: HttpService, private userService: UserService, 
    private router: Router, private noteService: NoteService, private snackBar: MatSnackBar
    
    ) { }

  ngOnInit() {
this.createNoteForm = this.formBuilder.group({
  title: ['',Validators.required],
  discription: ['',Validators.required]
});
}


get f() { return this.createNoteForm.controls; }

onSubmit(note) {
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
  this.snackBar.open("Note has been created successfully", "OK", {
    duration: 2000
  });
})
}

pinned(notes) {
  notes.pinned=1;
  this.updateMethod(notes);
}

updateMethod(notes) {
  this.noteService.updateNote(notes, notes.id).subscribe(response => {
    console.log(response);
  },
    error => {
      console.log("error");
    })
}


}




