import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'keep-sidebar',
  templateUrl: './keep-sidebar.component.html',
  styleUrls: ['./keep-sidebar.component.css']
})
export class KeepSidebarComponent implements OnInit {
@ViewChild('drawer') public drawer;
@Input() public keepSidebar:Subject<any>;;
  constructor( private router: Router) { }

  ngOnInit() {
    this.keepSidebar.subscribe(event => {
        if(this.drawer) {
          this.drawer.toggle();
        }
      });
   
  }
  archive() {
    this.router.navigate(['homepage/archive'])
  }

  notes() {
    this.router.navigate(['homepage/retrievenotes'])
  }
}
