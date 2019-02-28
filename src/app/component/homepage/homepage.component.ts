import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private service: NoteService,private dialog :MatDialog,) { }

  ngOnInit() {
  }
  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '550px',
      data: 
      {title: note.title, discription: note.discription,id: note.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
