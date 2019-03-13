import { Component, OnInit, Output } from '@angular/core';
import {MatDialog} from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/model/note';
import { UpdateNoteComponent } from 'src/app/component/update-note/update-note.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AddlabelNotesComponent } from '../addlabel-notes/addlabel-notes.component';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';

export interface DialogData {
  dis: string;
  title: string;
}

@Component({
  selector: 'app-retrieve-notes',
  templateUrl: './retrieve-notes.component.html',
  styleUrls: ['./retrieve-notes.component.scss']
})
export class AddnotesComponent implements OnInit {
  public grid = false;
  mytoken: string;
  public notes: Note[] = [];


  constructor(private noteService: NoteService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private keepHelperService : KeepHelperService) {

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
    this.updateMethod(data.notes);
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
  
//   @Output updateEvent= new EventEmitter();
//   public mytoken = localStorage.getItem('token');
//   public notes: Note[] = [];
//   public label:label[]=[];
//   constructor(private noteService: NoteService,
//     private dialog:MatDialog,
//     public snackBar: MatSnackBar,
//     public router: Router) { }

//   ngOnInit() {
//     this.getNotes();
//   }
//   getNotes() {
//     console.log("token", this.mytoken);
//     this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
//       this.notes = newNote;
//     }
//     )
//   }
//   openDialog(notes): void {
//     const dialogRef = this.dialog.open(UpdateNoteComponent, {
//       width: '500px',
//       data: notes

//     });

//     dialogRef.afterClosed().subscribe(result => {
//       this.noteService.updateNote(notes,notes.id).subscribe(response => {
//         console.log(response);
//       },
//         error => {
//           console.log("error");
//         })
//       console.log('The dialog was closed');

//     });
//   }


//   deleteNote(notes) {
//     console.log(notes.id);
//     this.noteService.removeNote(notes.id).subscribe(response => {
//       this.snackBar.open('Note deleted successfully', 'OK', { duration: 2000 });
//     }),
//       error => { 
//         console.log(error);
//         this.snackBar.open('Note cannot be deleted', 'Error in note retrieval', { duration: 2000 });
//       }
//   }

//   updateArchiveNote(notes) {
//     notes.archive = 1;
//     this.updateMethod(notes);
// }


// updateMethod(notes) {
//   console.log("archive"+ notes.archive)
//   this.noteService.updateNote(notes, notes.id).subscribe(response => {
//     this.snackBar.open('Note successfully updated', 'OK', { duration: 2000 });
//     console.log(response);
//   })                                                                                                                                                                                                                                                              ,
//     error => {
//       console.log("error");
//       this.snackBar.open('Denied in update', 'OK', { duration: 2000 });
//     }
// }

// moveToTrash(notes) {
//   notes.inTrash = 1;
//   this.updateMethod(notes);
// }

// pinnedNotes(notes) {
//   notes.pinned=1;
//   this.updateMethod(notes);
// }


// openDialogLabels(notes): void {
//   const dialogRef = this.dialog.open(AddlabelNotesComponent, {
//     width: '500px',
//     data: notes

//   });
// console.log(dialogRef)
//     dialogRef.afterClosed().subscribe(result => {
//       console.log(this.label)
// });
// }


// remove(label, notes) {
//   this.noteService.deletenotelabel(label.labelId, notes.noteId).subscribe(response => {
//     const data = { notes }
//     this.updateEvent.emit(data);
//     console.log(response);
//   }, (error) => console.log(error));
// }
// public onClickCheckbox(event, label, note) {
//   event.stopPropagation();
//   this.noteService.addLabelToNote(note.noteId, label).subscribe(response => {
//     console.log("adding check in database");
//     const data = { note };
//     // this.getNotes();
//     this.eventAddNoteLabel.emit(data);
//   }, (error) => console.log(error));
// }

// public getLabels() {
//   this.noteService.retrieveLabels().subscribe(newLabel => {
//     this.labels = newLabel;
//     console.log(this.labels);
//   }, error => {
//     this.snackBar.open("error", "error to retrieve labels", { duration: 2000 });
//   }
//   )
// }

// public labelFilter(event, noteLabels) {
//   event.stopPropagation();
//   this.newLabels.length = 0;
//   var k = 0;
//   for (var i = 0; i < this.labels.length; i++) {
//     var present = 0;
//     for (var j = 0; j < noteLabels.length; j++) {
//       if (this.labels[i].labelId === noteLabels[j].labelId && present === 0) {
//         present = 1;
//       }
//     }
//     if (present === 0) {
//       this.newLabels[k] = this.labels[i];
//       k++;
//     }
//   }
// }


  
