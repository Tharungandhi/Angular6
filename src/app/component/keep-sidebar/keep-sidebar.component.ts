import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { label } from 'src/app/core/model/label';

@Component({
  selector: 'keep-sidebar',
  templateUrl: './keep-sidebar.component.html',
  styleUrls: ['./keep-sidebar.component.scss']
})
export class KeepSidebarComponent implements OnInit {
  @ViewChild('drawer') public drawer;
  @Input() public keepSidebar: Subject<any>;
  
  public labels: label[] = [];

  constructor(private router: Router, public dialog: MatDialog,
    public noteService: NoteService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.getLabels(); 

    this.keepSidebar.subscribe(event => {
      if (this.drawer) {
        this.drawer.toggle();
      }
    });

  }

  public onClickUpdate(data) {
    this.getLabels();
  }

  
  notes() {
    this.router.navigate(['homepage/retrievenotes'])
  }

  editLabel(): void {
    const refDialog = this.dialog.open(EditLabelComponent, {
      width: '500px',
      height:'250px',
      data: ''
    });
    refDialog.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
    });
  }

  public getLabels() {
    this.noteService.retrieveLabels().subscribe(newLabel => {
      this.labels = newLabel;
    }, (error) => {
      this.snackBar.open("error", "error to retrieve labels", { duration: 2000 });
    }
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      width: '500px',
      height:'300px',
      data: ''
    });
  }
}
