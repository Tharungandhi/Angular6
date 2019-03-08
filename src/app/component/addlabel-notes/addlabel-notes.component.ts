import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from '../retrieve-notes/retrieve-notes.component';
import { NoteService } from 'src/app/core/services/note.service';
import { label } from 'src/app/core/model/label';
import { Note } from 'src/app/core/model/note';

@Component({
  selector: 'app-addlabel-notes',
  templateUrl: './addlabel-notes.component.html',
  styleUrls: ['./addlabel-notes.component.css']
})
export class AddlabelNotesComponent implements OnInit {
  
  public mytoken = localStorage.getItem('token'); 
  public label:label[]=[];
  public note:Note[]=[];

  constructor(
    public dialogRef: MatDialogRef<AddlabelNotesComponent>,
     @Inject(MAT_DIALOG_DATA) public notes,
    private noteService: NoteService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  this.getLabels();
  }

  public getLabels() {
    this.noteService.retrieveLabels().subscribe((resp: any) => {
      this.label = resp
      console.log(resp)
    }, (error) => console.log(error));
}

onNoClick(data, id): void {
  this.dialogRef.close();
  console.log(data);
}

onAddLabel(label,note){
  this.noteService.mapLabelTONote(note.id,label).subscribe((resp:any)=>
  console.log(resp)
  ),(error)=>{
    console.log(error)
  }
}


}
