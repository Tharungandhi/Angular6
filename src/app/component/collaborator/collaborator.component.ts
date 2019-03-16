import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from 'src/app/core/model/note';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/model/user';
import { FormControl } from '@angular/forms';

interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {
  public user;
  public emailId = '';
  public imageData = <ImageData>{};
  public myControl = new FormControl();
  public users: User[] = [];
  filteredOptions: Observable<any[]>;


  constructor(private userService: UserService, public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note,
private snackBar: MatSnackBar, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  collaborate(user, emailId) {
    console.log(emailId);
    console.log(user);
    this.userService.verifyEmail(emailId).subscribe(user => {
      console.log(user);
      console.log(this.note);
      this.snackBar.open("emailId verified", "ok", { duration: 2000 });
    }, error => console.log(error));
  }

  closeClick() {
    this.dialogRef.close();
  }

  getImage() {
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
