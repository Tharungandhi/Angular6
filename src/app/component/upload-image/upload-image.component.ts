import { Component, OnInit, Inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/model/user';
import { HttpService } from 'src/app/core/services/http.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
  export class UploadImageComponent implements OnInit {


    selectedFiles: FileList;
    currentFileUpload: File;
  
    constructor(private router: Router,
      private userService: UserService,
      private helperService: KeepHelperService,
      public dialogRef: MatDialogRef<UploadImageComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private snackBar: MatSnackBar) { }
  
    ngOnInit() {
    }
  
    onFileChanged(event) {
      this.selectedFiles = event.target.files;
    }
  
    upload() {
      this.currentFileUpload = this.selectedFiles.item(0);
      this.userService.uploadImage(this.currentFileUpload).subscribe(event => {
        this.snackBar.open("image uploaded", "ok", { duration: 2000 });
        this.dialogRef.close();
      });
    }
    close() {
      this.dialogRef.close();
    }
  
    removeImage()
    {
      this.userService.removeImage().subscribe(event => {
        this.snackBar.open("image removed", "ok", { duration: 2000 });
        this.dialogRef.close();
      });
  }
  }

 
  

