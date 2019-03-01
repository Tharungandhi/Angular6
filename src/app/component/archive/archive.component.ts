import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  public mytoken = localStorage.getItem('token');
  public archiveList=[];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getArchiveNotes;
  }


  getArchiveNotes(){
    this.noteService.retrieveNotes(this.mytoken)
    .subscribe(response=>{;
      console.log(response);
      for(var i=0; i<response['data'].data.length; i++)
      {
        this.archiveList.push(response['data'].data[i])
      }
    })
}

}




