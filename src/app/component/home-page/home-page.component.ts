import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { Router } from '@angular/router';
import { KeepSidebarComponent } from '../keep-sidebar/keep-sidebar.component';
import { Subject } from 'rxjs';

export interface DialogData {
  bridgelabz: string;
  name: string;
}

@Component({
  selector: 'homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomepageComponent implements OnInit {
  public isOpen = false;
  public toggleNav: Subject<any> = new Subject();

  constructor(private service: NoteService, private dialog: MatDialog,
    private router: Router, public noteService: NoteService) { }

  ngOnInit() {
  }

  // public onOpenSidebar() {
  //   // this.sidebarComp.drawer.toggle();
  //   // this.isOpen = !this.isOpen;
  // }
  public onToggleSidebar() {
    this.toggleNav.next();
  }
  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '550px',
      data:
        { title: note.title, discription: note.discription, id: note.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  sidebar() {
    this.router.navigate(['homepage/sidebar'])
  }

  updateArchiveNote(note) {
    note.archive = 1;
    this.updateMethod(note);
  }

  updateMethod(note) {
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })
  }
  moveToTrash(notes) {
    notes.inTrash = 1;
    this.updateMethod(notes);
  }
}
