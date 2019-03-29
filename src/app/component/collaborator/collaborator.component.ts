import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from 'src/app/core/model/note';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/core/model/user';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/core/services/note.service';

interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {


  public user;
  public emailId = '';
  public imageData = <ImageData>{};
  public myControl = new FormControl();
  public users: User[] = [];
  public collabUsers: User[] = [];

  constructor(private userService: UserService, public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private snackBar: MatSnackBar, private sanitizer: DomSanitizer,
    private noteService: NoteService) { }

  ngOnInit() {
    this.getImage();
    this.getUsers();
    this.getCollaborateUser();
    this.getNoteOwner();
  }


  public getNoteOwner() {
    this.userService.getCollaborateUser(this.note.userId).subscribe(
      user => this.user = user);
  }


  // public getUsers() {
  //   this.userService.getUser().subscribe(({ body }) => {
  //     this.users = body;
  //     console.log(this.users)
  //   }
  //     , error => console.log("error"));
  // }

  // collaborate(emailId) {
  //   this.userService.verifyEmail(emailId).subscribe(user => {
  //     this.snackBar.open("emailId verified", "ok", { duration: 2000 });
  //     this.noteService.createCollaborator(this.note.id, user.id).subscribe(resp => {
  //       this.dialogRef.close();
  //       this.snackBar.open("added to collaborator", "ok", { duration: 2000 })
  //     }
  //     )
  //   }, error => { this.snackBar.open("email not present or collaborator already present", "error", { duration: 2000 }) });

  // }

  // closeClick() {
  //   this.dialogRef.close();
  // }

  public getImage() {
    this.userService.downloadImage().subscribe(resp => {
      this.user = resp
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

  // public getCollaborateUser() {
  //   const size=this.note.collaborators.length;
  //   for (let i = 0; i < size; i++) {
  //     var k = 0;
  //     console.log(this.note.collaborators[i].userId);
  //     this.userService.getCollaborateUser(this.note.collaborators[i].userId).subscribe(
  //       user => {
  //         this.collabUsers[k] = user;
  //         k++;
  //       }
  //       , error => console.log(error))
  //   }
  // }

  // public removeCollaborator(collabUser) {
  //   this.noteService.removeCollaborateUser(this.note.id, collabUser.id).subscribe(resp => {
  //     console.log(resp)
  //     this.snackBar.open("collaborator removed", "ok", { duration: 2000 });
  //     this.dialogRef.close();
  //   }, error =>
  //       this.snackBar.open("collaborator connot be removed", "error", { duration: 2000 })
  //   )
  // }



  // public getNoteOwner()
  //   {
  //     this.userService.getCollaborateUser(this.note.userId).subscribe(
  //       user => this.user=user);
  //   }


  public getUsers() {
    this.userService.getUsers().subscribe(({ body }) => {
      this.users = body;
      console.log(this.users)
    }
      , error => console.log("error"));
  }

  public collaborate(emailId) {
    this.userService.verifyEmail(emailId).subscribe(user => {
      if (user.id === this.note.userId) {
        this.snackBar.open("you cannot add the owner", "error", { duration: 2000 });
        return;
      }
      this.snackBar.open("emailId verified", "ok", { duration: 2000 });
      this.noteService.createCollaborator(this.note.id, user.id).subscribe(resp => {
        this.dialogRef.close();
        this.snackBar.open("added to collaborator", "ok", { duration: 2000 })
      }
      )
    }, error => { this.snackBar.open("email not present or collaborator already present", "error", { duration: 2000 }) });

  }

  public closeClick() {
    this.dialogRef.close();
  }

  public getCollaborateUser() {
    for (let i = 0; i < this.note.collaborators.length; i++) {
      var k = 0;
      console.log(this.note.collaborators[i].userId);
      this.userService.getCollaborateUser(this.note.collaborators[i].userId).subscribe(
        user => {
          this.collabUsers[k] = user;
          k++;
        }
        , error => console.log(error))
    }
  }

  public removeCollaborator(collabUser) {
    this.noteService.removeCollaborateUser(this.note.id, collabUser.id).subscribe(resp => {
      console.log(resp)
      this.snackBar.open("collaborator removed", "ok", { duration: 2000 });
      this.dialogRef.close();
    }, error =>
        this.snackBar.open("collaborator connot be removed", "error", { duration: 2000 })
    )
  }

}
