import { Component, OnInit, Inject } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { label } from 'src/app/core/model/label';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.css']
})
export class EditLabelComponent implements OnInit {
public labels:label[]=[];
public token=localStorage.getItem('token');

  constructor( @Inject(MAT_DIALOG_DATA) public data,public refDialog: MatDialogRef<EditLabelComponent>,
    public noteService: NoteService, public snackBar:MatSnackBar
  ) { }

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

public closeDailog()
{
  this.refDialog.close();
}

public updateLabel(labels,labelName)
  {
    var labelName=labelName.innerHTML;
    console.log(labelName);
    var newLabel=
    {
      ...labels,
      "labelName" : labelName
    }
    this.noteService.updateLabel(newLabel,newLabel.id).subscribe(response => {
      this.ngOnInit();
      this.snackBar.open("label updated", "Ok", { duration: 2000 });
    }, (error) => {
      this.snackBar.open("error", "error to update labels", { duration: 2000 });
    }
    );
  }

  public deleteLabel(label)
  {
    this.noteService.removeLabel(label.id).subscribe(response => {
      this.ngOnInit();
      this.snackBar.open("label deleted", "Ok", { duration: 2000 });
    }, (error) => {
      this.snackBar.open("error", "error to delete labels", { duration: 2000 });
    }
    );
  }

  public createLabel(labelName)
  {
    var labelName=labelName.innerHTML;
    var labels=
    {
      "labelName":labelName
    }
    this.noteService.createLabels(labels).subscribe(response => {
      this.ngOnInit();
      this.snackBar.open("label created", "Ok", { duration: 2000 });
    }, (error) => {
      this.snackBar.open("error", "error to create labels", { duration: 2000 });
    }
    );
  }


}
