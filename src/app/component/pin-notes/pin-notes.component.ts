import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { label } from 'src/app/core/model/label';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-pin-notes',
  templateUrl: './pin-notes.component.html',
  styleUrls: ['./pin-notes.component.scss']
})
export class PinNotesComponent implements OnInit {
  @Input() notes
  @Input() newNote

  @Output() updateEvent = new EventEmitter();
  @Input() public grid = false;
  public colors=['#FFE4C4','#F8F8FF', '#5F9EA0','#778899','#00FFFF',
'#ADFF2F', '#FF69B4', '#F08080', '#4682B4'];


  public labels: label[]=[];
  public newLabels:label[]=[];
  public mytoken: string; 
  removable = true;
  public filter = '';
  
  


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


  collaborator(notes)
  {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '500px',
      data: notes
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = { notes }
      this.updateEvent.emit(data);
      console.log('The dialog was closed');
    });
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
  
  updateNote(note,id) {
    console.log(note);
    this.noteService.updateNote(note,id).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })

  }

  Colourupdate(data) {
    this.updateEvent.emit(data);
}


changeColor(color,notes){
  notes.color=color;
this.updateNote(notes,notes.id);
}

}
