import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { Note } from 'src/app/core/model/note';
import { AddlabelNotesComponent } from '../addlabel-notes/addlabel-notes.component';
import { label } from 'src/app/core/model/label';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  //   public mytoken = localStorage.getItem('token');
  //   @Input() newNote
  //   @Output() updateEvent = new EventEmitter();

  //   public archiveList=[];
  //   public notes: Note[] = [];
  //   public label:label[]=[];
  //   public grid = false;

  //   public colors=['#FFE4C4','#F8F8FF', '#5F9EA0','#778899','#00FFFF',
  //   '#ADFF2F', '#FF69B4', '#F08080', '#4682B4'];

  //   constructor(private noteService: NoteService, public snackBar: MatSnackBar,
  //     public dialog: MatDialog,
  //     private keepHelperService : KeepHelperService) { }


  //   ngOnInit() {
  //     this.getNotes();
  //     this.keepHelperService.getTheme().subscribe((resp) =>
  //     this.grid = resp
  // );
  //   }

  //   getNotes() {
  //     this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
  //       this.notes = newNote;
  //     }, error => {
  //       this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
  //     }
  //     )
  //   }

  //   openDialog(notes): void {
  //     const dialogRef = this.dialog.open(UpdateNoteComponent, {
  //       width: '500px',
  //       data: notes
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       this.noteService.updateNote(notes, notes.id).subscribe(response => {
  //         console.log(response);
  //       },
  //         error => {
  //           console.log("error");
  //         })
  //       console.log('The dialog was closed');
  //     });
  //   }

  //   updateMethod(notes) {
  //     this.noteService.updateNote(notes, notes.id).subscribe(response => {
  //       console.log(response);
  //     },
  //       error => {
  //         console.log("error");
  //       })
  //   }



  //   updateArchiveNote(notes) {
  //     notes.archive = 0;
  //     this.updateMethod(notes);
  //   }



  // moveToTrash(notes) {
  //   notes.inTrash = 1;
  //   notes.archive=-0;
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

  // Colourupdate(data) {
  //   this.updateEvent.emit(data);
  // }


  // changeColor(color,notes){
  // notes.color=color;
  // this.updateMethod(notes);
  // }

  public grid = false;
  mytoken: string;
  public notes: Note[] = [];


  constructor(private noteService: NoteService,
    public snackBar: MatSnackBar,
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
  public onClickUpdate(data) {
    this.updateMethod(data.notes);
  }

  public refresh(event) {
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




