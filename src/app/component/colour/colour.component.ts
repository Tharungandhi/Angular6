import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-colour',
  templateUrl: './colour.component.html',
  styleUrls: ['./colour.component.scss']
})
export class ColourComponent implements OnInit {

  
   @Input() newNote

  public colors=['#FFE4C4','#F8F8FF', '#5F9EA0','#778899','#00FFFF',
  '#ADFF2F', '#FF69B4', '#F08080', '#4682B4'];

  colorMenu=false

  fillTheColor;
  
  constructor( private noteService:NoteService) { }

  ngOnInit() {
  }


  
  colorChange() {
    if (this.colorMenu)
    this.colorMenu = false
    else
    this.colorMenu = true;
    }
    

    addColor(color) {
    this.fillTheColor = color;
   this.newNote.color = color;
    this.noteService.updateNote( this.newNote,  this.newNote.id).subscribe(resp => {
    console.log(resp)
    }, (error) => {
    console.log(error)
    })
   
    }
  


}
