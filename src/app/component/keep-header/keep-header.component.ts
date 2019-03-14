import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UploadImageComponent } from '../upload-image/upload-image.component';


@Component({
  selector: 'keep-header',
  templateUrl: './keep-header.component.html',
  styleUrls: ['./keep-header.component.scss']
})
export class KeepHeaderComponent implements OnInit {
@Output() toggleEvent = new EventEmitter();
public grid = false;
public hide = true;
public show=true;
public searchString = '';

  constructor( private keepHelperService: KeepHelperService,
    private router: Router,
    private dialog:MatDialog) { }

  ngOnInit() {
  }

public toggle() {
  this.toggleEvent.emit();
}

public viewGrid() {
  this.grid = !this.grid;
  this.keepHelperService.setTheme(this.grid);
}

public searchtest() {
  this.keepHelperService.setSearchNote(this.searchString);
  this.router.navigate(['homepage/search-note'])
}

clearSearch()
{
  this.searchString='';
  this.router.navigate(['homepage/retrievenotes'])
}

imageupload()
{
  this.router.navigate(['homepage/image'])
}

// onClickUpdate(data) {
//   this.router.navigate(['homepage/image'])
// }

openDialog(): void {
      const dialogRef = this.dialog.open(UploadImageComponent, {
        width: '500px',
       
  
      });}
  
    //   dialogRef.afterClosed().subscribe(result => {
    //     this.noteService.updateNote(notes,notes.id).subscribe(response => {
    //       console.log(response);
    //     },
    //       error => {
    //         console.log("error");
    //       })
    //     console.log('The dialog was closed');
  
    //   });
    // }
    

}
