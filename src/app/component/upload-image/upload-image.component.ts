import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/model/user';
import { HttpService } from 'src/app/core/services/http.service';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  selectedFile: File
  user: User
  fileToUpload: File

constructor(public http: HttpService) {}
  
ngOnInit() {
     } 

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  public upload() {

    this.pushFileToStorage(this.selectedFile).subscribe(resp => {
      console.log(resp), (error) => {
        console.log(error)
      }
    })
  }

  pushFileToStorage(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    var token = localStorage.getItem('token')
    return this.http.putService('http://localhost:8080/user/uploadimage/' + token, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

}

//   selectedFiles: FileList;

//   currentFileUpload: File;

//    constructor(private uploadService: UserService) {}

//    ngOnInit() {
//   }  

//  selectFile(event) {
//    this.selectedFiles = event.target.files;
//  }

//  upload() {
//    this.currentFileUpload = this.selectedFiles.item(0);
//    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
//     if (event instanceof HttpResponse) {
//        console.log('File is completely uploaded!');
//      }
//    });
//    this.selectedFiles = undefined;
//  }
 
  
}
