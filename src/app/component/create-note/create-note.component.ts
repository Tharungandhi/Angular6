import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  createNoteForm: FormGroup;
  submitted = false;
  constructor(private NoteService: NoteService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createNoteForm = this.formBuilder.group({
      title: ['', Validators.required],
      discription: ['', Validators.required]
    });
  };
  get f() { return this.createNoteForm.controls; }
  public onSubmit(note) {
    this.submitted = true;
    console.log(this.createNoteForm.value)
    if (this.createNoteForm.invalid) {
      return;
    }
    this.NoteService.save(note);
  }
}


