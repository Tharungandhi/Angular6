import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KeepHelperService } from 'src/app/core/services/keep-helper.service';
import { Router } from '@angular/router';


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
public searchString = '';

  constructor( private keepHelperService: KeepHelperService,
    private router: Router) { }

  ngOnInit() {
  }

public toggle() {
  this.toggleEvent.emit();
}

public viewGrid() {
  this.grid = !this.grid;
  this.keepHelperService.setTheme(this.grid);
}

public searchtest() {
  this.keepHelperService.setSearchNote(this.searchString);
  this.router.navigate(['homepage/search-note'])
}

clearSearch()
{
  this.searchString='';
  this.router.navigate(['homepage/retrievenotes'])
}

}
