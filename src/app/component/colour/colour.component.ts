import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-colour',
  templateUrl: './colour.component.html',
  styleUrls: ['./colour.component.css']
})
export class ColourComponent implements OnInit {

  @Input() public colourNotes: Subject<any>;

  @Output()  eventEmitter= new EventEmitter();

  
  constructor() { }

  ngOnInit() {
  }

}
