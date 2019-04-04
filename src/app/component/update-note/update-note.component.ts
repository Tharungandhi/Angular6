import { Component, OnInit,Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import {NoteService} from 'src/app/core/services/note.service';
import { DialogData, RetrievenotesComponent } from '../retrieve-notes/retrieve-notes.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { label } from 'src/app/core/model/label';
import { Note } from 'src/app/core/model/note';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {
 
 

visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selectedMoment=new Date();
  min=new Date();
  public labels: label[]=[];
  public newLabels:label[]=[];
  selectedFiles:File;
  @Output() updateEvent = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note, private noteService: NoteService,
    private snackBar: MatSnackBar,private dialog:MatDialog,
    private sanitizer:DomSanitizer) { }

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

public onFileChanged(event, note) {
  this.selectedFiles = event.target.files[0];
  this.uploadImage(note);
}

public uploadImage(note) {
  this.noteService.addImage(this.selectedFiles, note.noteId).subscribe((resp) => {
    console.log("image added")
    this.updateNote(note);
  }
  );
}

public getImages(image, note): any {
  const url = `data:${note.contentType};base64,${image.images}`;
  return this.sanitizer.bypassSecurityTrustUrl(url);
}

public deleteImage(image,note)
{
  console.log(image.imagesId)
  this.noteService.removeImage(image.imagesId).subscribe((resp)=>
  {
    console.log("successfull")
    this.updateNote(note);
  })
}
}