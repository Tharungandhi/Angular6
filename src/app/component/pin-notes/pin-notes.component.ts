import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { label } from 'src/app/core/model/label';

@Component({
  selector: 'app-pin-notes',
  templateUrl: './pin-notes.component.html',
  styleUrls: ['./pin-notes.component.scss']
})
export class PinNotesComponent implements OnInit {
  @Input() notes
  @Output() updateEvent = new EventEmitter();
  @Input() public grid = false;
  public labels: label[]=[];
  public newLabels:label[]=[];
  public mytoken: string; 
  removable = true;
  
  


  constructor(private noteService: NoteService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog) {

  }
  ngOnInit() {
    this.getLabels();
  }


  public getLabels() {
    this.noteService.retrieveLabels().subscribe(newLabel => {
      this.labels = newLabel;
    }, (error) => {
      console.log(error);
      this.snackBar.open("error", "error to retrieve labels", { duration: 2000 });
    }
    )
  }
  public openDialog(notes): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '500px',
      data: notes

    });

    dialogRef.afterClosed().subscribe(result => {
      this.noteService.updateNote(notes, notes.id)
      console.log('The dialog was closed');

    });
  }

  pinnedNotes(key, notes) {
    notes.pinned = key === 'pinned' ? 1 : 0;
    console.log(notes.pinned)
    const data = { notes }
    this.updateEvent.emit(data);
  }

  public updateArchiveNote(notes) {
    notes.archive = 1;
    notes.pinned = 0;
    const data = { notes }
    this.updateEvent.emit(data);
  }

 public trashNote(notes) {
    notes.inTrash = 1;
    console.log(notes.inTrash)
    const data = { notes }
    this.updateEvent.emit(data);
  }

  remove(label, notes) {
    this.noteService.deletenotelabel(label.id, notes.id).subscribe(response => {
      const data = { notes }
      this.updateEvent.emit(data);
      console.log(response);
    }, (error) => console.log(error));
  }


  onAddLabel(label, note) {
    this.noteService.mapLabelTONote(note.id, label).subscribe((resp: any) =>
      console.log(resp)
    ), (error) => {
      console.log(error)
    }
  }

  addLabelToNote(event, label, notes) {
    event.stopPropagation();
    console.log(label);
    console.log(notes);
    this.noteService.mapLabelTONote(notes.id, label).subscribe((resp: any) => {
      const data = { notes }
      this.updateEvent.emit(data);
    }
    ), (error) => {
      console.log(error)
    }
  }

  public labelFilter(event, noteLabels) {
    event.stopPropagation();
    console.log(noteLabels);
    console.log(this.labels);
    this.newLabels.length = 0 && this.newLabels.length !=null ;
    var k = 0;
    for (var i = 0; i < this.labels.length; i++) {
      var present = 0;
      for (var j = 0; j < noteLabels.length; j++) {
        if (this.labels[i].id=== noteLabels[j].id && present === 0) {
          present = 1;
        }
      }
      if (present === 0) {
        this.newLabels[k] = this.labels[i];
        k++;
      }
    }
  

}
//   public notes: Note[] = [];
//   public label:label[]=[];
//   public mytoken=localStorage.getItem('token');
//   constructor(private noteService: NoteService,
//     public snackBar:MatSnackBar,public dialog: MatDialog) { }

//   ngOnInit() {
//     this.getNotes();
//   }


//   openDialog(notes): void {
//     const dialogRef = this.dialog.open(UpdateNoteComponent, {
//       width: '500px',
//       data: notes

//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');

//     });
//   }

//   getNotes() {
//     this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
//       this.notes = newNote;
//     }, error => {
//       this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
//     }
//     )
//   }

//   updateMethod(notes) {
//     this.noteService.updateNote(notes, notes.id).subscribe(response => {
//       console.log(response);
//     },
//       error => {
//         console.log("error");
//       })
//   }
  
//   pinnedNotes(notes) {
//     notes.pinned=0;
//     this.updateMethod(notes);
// }

// moveToTrash(notes) {
//   notes.inTrash = 1;
//   this.updateMethod(notes);
// }

// updateArchiveNote(notes) {
//   notes.archive=1;
//   notes.pinned=0;
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
}
