import { Component, OnInit, Output } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/model/note';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { EventEmitter } from 'events';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';


@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
//   @Output() eventEmitter= new EventEmitter();
//   public notes: Note[] = [];
//   public mytoken=localStorage.getItem('token');
//   public grid = false;

//   constructor(private noteService: NoteService,
//     public snackBar:MatSnackBar,public dialog: MatDialog,
//     private keepHelperService : KeepHelperService) { }

//   ngOnInit() {
//     this.getNotes();
//     this.keepHelperService.getTheme().subscribe((resp) =>
//     this.grid = resp
// );
//   }


//  public openDialog(notes): void {
//     const dialogRef = this.dialog.open(UpdateNoteComponent, {
//       width: '500px',
//       data: notes
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');

//     });
//   }

// public  getNotes() {
//     this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
//       this.notes = newNote;
//       console.log(this.notes)
//     }, error => {
//       this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
//     }
//     )
//   }


//   deleteNote(notes) {
//     console.log(notes.id);
//     this.noteService.removeNote(notes.id).subscribe(response => {
//       this.refresh(event);
//       this.snackBar.open('Note deleted successfully', 'OK', { duration: 2000 });
//     }),
//       error => { 
//         console.log(error);
//         this.snackBar.open('Note cannot be deleted', 'Error in note retrieval', { duration: 2000 });
//       }
//   }


//   updateMethod(notes) {
//     this.noteService.updateNote(notes, notes.id).subscribe(response => {
//       console.log(response);
//     },
//       error => {
//         console.log("error");
//       })
//   }



//   restore(notes)
//   {
//     notes.inTrash=0;
//     console.log(notes);
//     this.noteService.updateNote(notes,notes.id).subscribe(response => {
//       console.log(response);
//       this.refresh(event);
//       this.snackBar.open("Restored", "Ok", { duration: 2000 });
//     },
//       error => {
//         console.log("error");
//       })
// }


// onClickUpdate(data) {
//   this.updateMethod(data.notes);
// }


// refresh(event) {
//   if (event) {
//     this.getNotes();
//   }
// }

public grid = false;
mytoken: string;
public notes: Note[] = [];


constructor(private noteService: NoteService,
  public snackBar: MatSnackBar,
  private dialog: MatDialog,
  private keepHelperService: KeepHelperService) {

}

ngOnInit() {
  this.getNotes();
  this.keepHelperService.getTheme().subscribe((resp) =>
    this.grid = resp
  );
}

getNotes() {
  this.mytoken = localStorage.getItem('token')
  console.log("token", this.mytoken);
  this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
    this.notes = newNote;
  }
  )
}
onClickUpdate(data) {
  this.updateMethod(data.note);
}

refresh(event) {
  if (event) {
    this.getNotes();
  }
}

public updateMethod(notes) {
  this.noteService.updateNote(notes, notes.id).subscribe(response => {
    this.getNotes();
    console.log(response);
  }, (error) => console.log(error));
}


public updateNoteToGrid(data) {
  this.updateMethod(data.note);
}
}
