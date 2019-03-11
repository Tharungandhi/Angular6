import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';


@Component({
  selector: 'keep-header',
  templateUrl: './keep-header.component.html',
  styleUrls: ['./keep-header.component.scss']
})
export class KeepHeaderComponent implements OnInit {
@Output() toggleEvent = new EventEmitter();
public grid = false;
public hide = true;
public show=true;

  constructor( private keepHelperService: KeepHelperService) { }

  ngOnInit() {
  }

public toggle() {
  this.toggleEvent.emit();
}

public viewGrid() {
  this.grid = !this.grid;
  this.keepHelperService.setTheme(this.grid);
}
}
