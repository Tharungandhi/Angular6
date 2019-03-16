import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { UserService } from 'src/app/core/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'keep-header',
  templateUrl: './keep-header.component.html',
  styleUrls: ['./keep-header.component.scss']
})
export class KeepHeaderComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter();
  public user
  public grid = false;
  public hide = true;
  public show = true;
  public searchString = '';
  public imageData = <ImageData>{};




  constructor(private keepHelperService: KeepHelperService,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getImage();
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

  clearSearch() {
    this.searchString = '';
    this.router.navigate(['homepage/retrievenotes'])
  }

  imageupload() {
    this.router.navigate(['homepage/image'])
  }

  // onClickUpdate(data) {
  //   this.router.navigate(['homepage/image'])
  // }

  openDialog(): void {
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





}
