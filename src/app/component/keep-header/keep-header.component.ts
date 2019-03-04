import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'keep-header',
  templateUrl: './keep-header.component.html',
  styleUrls: ['./keep-header.component.css']
})
export class KeepHeaderComponent implements OnInit {
@Output() toggleEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
public toggle() {
  this.toggleEvent.emit();
}
}
