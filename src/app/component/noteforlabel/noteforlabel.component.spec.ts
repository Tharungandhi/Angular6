import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteforlabelComponent } from './noteforlabel.component';

describe('NoteforlabelComponent', () => {
  let component: NoteforlabelComponent;
  let fixture: ComponentFixture<NoteforlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteforlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteforlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
