import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeepHelperService {
  public theme$: Subject<any> = new Subject();
  public searchNote$: Subject<any> = new Subject();
 
  constructor() { }

  public setTheme(themeChanged: boolean) {
    this.theme$.next(themeChanged);
  }

  public getTheme() {
    return this.theme$;
  }

  public setSearchNote(search: string) {
    this.searchNote$.next(search);
  }

  public getSearchNote() {
    return this.searchNote$;
}
}
