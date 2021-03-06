import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { label } from 'src/app/core/model/label';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { RetrievenotesComponent } from '../retrieve-notes/retrieve-notes.component';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user.service';


interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'app-pin-notes',
  templateUrl: './pin-notes.component.html',
  styleUrls: ['./pin-notes.component.scss']
})
export class PinNotesComponent implements OnInit {
  @Input() notes
  //@Input() newNote
  @Input() message
  @Output() updateEvent = new EventEmitter();
  @Input() public grid = false;
  public imageData = <ImageData>{};
  public user
  public labels: label[]=[];
  public newLabels:label[]=[];
  public mytoken: string; 
  public min = new Date();
  public filter = '';
  selectable = true;
  removable = true;
  selectedMoment =new Date();
  selectedFiles: File;

  constructor(private noteService: NoteService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog, private userService: UserService,
     private sanitizer: DomSanitizer,
    private addNotes:RetrievenotesComponent) {
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

  public openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      const notes=note;
      const data = { notes }
    this.updateEvent.emit(data);
      console.log('The dialog was closed');

    });
  }

 public pinnedNotes(key, notes) {
    notes.pinned = key === 'pinned' ? 1 : 0;
    console.log(notes.pinned)
    const data = { notes }
    this.updateEvent.emit(data);
  }

  public updateArchiveNote(key,notes) {
    notes.pinned = 0;
    notes.archive=key==='archive'? 1:0;
   
  
    const data = {key, notes }
    this.updateEvent.emit(data);
  }

  

 public trashNote(notes) {
    notes.inTrash = 1;
    console.log(notes.inTrash)
    const data = { notes }
    this.updateEvent.emit(data);
  }

 public remove(notes,label) {
    this.noteService.deletenotelabel( notes.id,label.id).subscribe(response => {
      const data = { notes }
      this.updateEvent.emit(data);
      this.getLabels();
      console.log(response);
      this.snackBar.open("label is removed from the note", "ok", { duration: 2000 });
    }, (error) => console.log(error));
  }


  public updateReminder(notes,selectedMoment){
    notes.reminder=selectedMoment;
    const data = {notes};
    this.updateEvent.emit(data);
  }

  public removeReminder(notes){
    notes.reminder=null;
    console.log(notes.reminder)
    const data = {notes};
    this.updateEvent.emit(data);
  }

 public  onAddLabel(label, notes) {
    this.noteService.mapLabelTONote(notes.id, label).subscribe((resp: any) =>
      console.log(resp)
    ), (error) => {
      console.log(error)
    }
  }

 public  addLabelToNote(event, label, notes) {
    event.stopPropagation();
    console.log(label);
    console.log(notes);
    this.noteService.mapLabelTONote(notes.id, label).subscribe((resp: any) => {
      const data = { notes }
      this.updateEvent.emit(data);
      this.snackBar.open("label is added to the note", "ok", { duration: 2000 });
    }
    ), (error) => {
      console.log(error)
    }
  }


public  collaborator(notes)
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
  
 public updateNote(note,id) {
    console.log(note);
    this.noteService.updateNote(note,id).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })

  }

 public colourupdate(data) {
    this.updateEvent.emit(data);
}

public onClickUpdate(data) {
  this.addNotes.updateMethod(data.notes);
}


public changeColor(color,notes){
  notes.color=color;
this.updateNote(notes,notes.id);
}


public openImageDialog(): void {
  const dialogRef = this.dialog.open(UploadImageComponent, {
    width: '500px',


  });
  dialogRef.afterClosed().subscribe(result => {
    this.getImage();
    console.log('The dialog was closed');
  });
}

public getImage() {
  this.userService.downloadImage().subscribe(resp => {
    this.user = resp
    console.log(this.user)
    if (this.user.image != null) {
      const url = `data:${this.user.contentType};base64,${this.user.image}`;
      this.imageData = {
        imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
      }
    }
    else {
      this.imageData.imageSrc = null;
    }
  }, error => {
    this.snackBar.open("error to download image", "error", { duration: 2000 });
  }
  )
}

public onFileChanged(event, note) {
  this.selectedFiles = event.target.files[0];
  this.uploadImage(note);
}



public uploadImage(notes) {
  this.noteService.addImage(this.selectedFiles, notes.id).subscribe((resp) => {
    console.log("image added")
    const data = { notes }
    this.updateEvent.emit(data);
  }
  );
}

public getImages(image, notes): any {
  const url = `data:${notes.contentType};base64,${image.images}`;
  return this.sanitizer.bypassSecurityTrustUrl(url);
}
}
