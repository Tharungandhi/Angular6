import { Component, OnInit,Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import {NoteService} from 'src/app/core/services/note.service';
import { DialogData, RetrievenotesComponent } from '../retrieve-notes/retrieve-notes.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { label } from 'src/app/core/model/label';
import { Note } from 'src/app/core/model/note';



@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {
 
 
//   updateNoteForm:FormGroup;
//   @Output() updateEvent = new EventEmitter();
//  public mytoken = localStorage.getItem('token'); 
//  public labels: label[]=[];
//  public newLabels:label[]=[];
//  public min = new Date();
//  public filter = '';
//  selectable = true;
//  removable = true;
//  selectedMoment =new Date();
 

//  constructor(
//   public dialogRef: MatDialogRef<UpdateNoteComponent>,
//   @Inject(MAT_DIALOG_DATA) public data: DialogData,
//   private noteService: NoteService,
//   private formBuilder:FormBuilder,
//     public snackBar: MatSnackBar,
//     private dialog: MatDialog,
//     private addNotes:RetrievenotesComponent) {}

//   ngOnInit() {
//     this.updateNoteForm=this.formBuilder.group({});
  
//   }
  

//   updateNote(notes,id) {
//     console.log(notes);
//     this.noteService.updateNote(notes,id).subscribe(response => {
//       console.log(response);
//     },
//       error => {
//         console.log("error");
//       })
//     this.dialogRef.close();
//   }

//   pinnedNotes(key, notes) {
//     notes.pinned = key === 'pinned' ? 1 : 0;
//     console.log(notes.pinned)
//     const data = { notes }
//     this.updateEvent.emit(data);
//   }

//   public updateArchiveNote(notes) {
//     notes.archive = 1;
//     notes.pinned = 0;
//     const data = { notes }
//     this.updateEvent.emit(data);
//   }

//  public trashNote(notes) {
//     notes.inTrash = 1;
//     console.log(notes.inTrash)
//     const data = { notes }
//     this.updateEvent.emit(data);
//   }

//   remove(label, notes) {
//     this.noteService.deletenotelabel(label.id, notes.id).subscribe(response => {
//       const data = { notes }
//       this.updateEvent.emit(data);
//       console.log(response);
//     }, (error) => console.log(error));
//   }


//   public updateReminder(notes,selectedMoment){
//     notes.reminder=selectedMoment;
//     const data = {notes};
//     this.updateEvent.emit(data);
//   }

//   public removeReminder(notes){
//     notes.reminder=null;
//     console.log(notes.reminder)
//     const data = {notes};
//     this.updateEvent.emit(data);
//   }

//  public onAddLabel(label, notes) {
//     this.noteService.mapLabelTONote(notes.id, label).subscribe((resp: any) =>
//       console.log(resp)
//     ), (error) => {
//       console.log(error)
//     }
//   }

// public addLabelToNote(event, label, notes) {
//     event.stopPropagation();
//     console.log(label);
//     console.log(notes);
//     this.noteService.mapLabelTONote(notes.id, label).subscribe((resp: any) => {
//       const data = { notes }
//       this.updateEvent.emit(data);
//     }
//     ), (error) => {
//       console.log(error)
//     }
//   }


//   public collaborator(notes)
//   {
//     const dialogRef = this.dialog.open(CollaboratorComponent, {
//       width: '500px',
//       data: notes
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       const data = { notes }
//       this.updateEvent.emit(data);
//       console.log('The dialog was closed');
//     });
// }

//   public labelFilter(event, noteLabels) {
//     event.stopPropagation();
//     console.log(noteLabels);
//     console.log(this.labels);
//     this.newLabels.length = 0 && this.newLabels.length !=null ;
//     var k = 0;
//     for (var i = 0; i < this.labels.length; i++) {
//       var present = 0;
//       for (var j = 0; j < noteLabels.length; j++) {
//         if (this.labels[i].id=== noteLabels[j].id && present === 0) {
//           present = 1;
//         }
//       }
//       if (present === 0) {
//         this.newLabels[k] = this.labels[i];
//         k++;
//       }
//     }
//   }

//     public createNewLabel(filter, note) {
//       const var1 = note.labels.some((label) => label.labelName === filter)
//       const var2 = this.newLabels.some((label) => label.labelName === filter)
//       if (var1 || var2) {
//         this.snackBar.open("label name already present", "error", { duration: 2000 });
//         return;
//       }
//       const newLabel =
//       {
//         labelName: filter
//       }
//       this.noteService.createLabels(newLabel).subscribe(label => {
//         this.noteService.mapLabelTONote(note.id, label).subscribe(response => {
//           console.log("adding check in database");
//           const data = { note };
//           this.updateEvent.emit(data);
//           this.snackBar.open("label created", "Ok", { duration: 2000 });
//         })
//       }, error => {
//         this.snackBar.open("error", "error to create labels", { duration: 2000 });
//       }
//       )
//   }
visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selectedMoment=new Date();
  min=new Date();
  public labels: label[]=[];
  public newLabels:label[]=[];
  @Output() updateEvent = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note, private noteService: NoteService,
    private snackBar: MatSnackBar,private dialog:MatDialog) { }

  ngOnInit() {
  }

  closeClick(newNote) {
    console.log(newNote.title);
    console.log(newNote.description);
    this.updateNote(newNote);
  }

  moveToTrash(note) {
    note.inTrash = 1;
    console.log(note);
    this.updateNote(note);
  }

  updateArchiveNote(key, data) {
    data.archive = key === 'archive' ? 1 : 0;
    data.pinned = 0;
    this.updateNote(data);
  }

  pinned(key, note) {
    note.pinned = key === 'pinned' ? 1 : 0;
    this.updateNote(note);
  }

  updateNote(newNote) {
    this.noteService.updateNote(newNote, newNote.noteId).subscribe(response => {
      console.log(response);
      this.dialogRef.close();
    },
      error => {
        console.log("error");
      })
  }

  removeLabel(label, note) {
    this.noteService.deletenotelabel(note.noteId, label.labelId).subscribe(response => {
      console.log("deleting check in database");
      this.dialogRef.close();
    }, (error) => console.log(error));
  }

  public addNoteLabel(data) {
    this.updateNote(data.note);
  }

  updateColor(data) {
    this.updateNote(data.note);
  }

  saveRemainder(selectedMoment, note) {
    note.remainder = selectedMoment;
    this.updateNote(note);
  }

  public dailogCollaborator(note) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '500px',
      height:'250px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
}

public labelFilter(event, noteLabels) {
  event.stopPropagation();
  console.log(noteLabels);
  console.log(this.labels);
  this.newLabels.length = 0  ;
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

  public createNewLabel(filter, note) {
    const var1 = note.labels.some((label) => label.labelName === filter)
    const var2 = this.newLabels.some((label) => label.labelName === filter)
    if (var1 || var2) {
      this.snackBar.open("label name already present", "error", { duration: 2000 });
      return;
    }
    const newLabel =
    {
      labelName: filter
    }
    this.noteService.createLabels(newLabel).subscribe(label => {
      this.noteService.mapLabelTONote(note.id, label).subscribe(response => {
        console.log("adding check in database");
        const data = { note };
        this.updateEvent.emit(data);
        this.snackBar.open("label created", "Ok", { duration: 2000 });
      })
    }, error => {
      this.snackBar.open("error", "error to create labels", { duration: 2000 });
    }
    )
}
public  addLabelToNote(event, label, notes) {
  event.stopPropagation();
  console.log(label);
  console.log(notes);
  this.noteService.mapLabelTONote(notes.id, label).subscribe((resp: any) => {
    // const data = { notes }
    // this.updateEvent.emit(data);
    this.snackBar.open("label is added to the note", "ok", { duration: 2000 });
  }
  ), (error) => {
    console.log(error)
  }
}
}