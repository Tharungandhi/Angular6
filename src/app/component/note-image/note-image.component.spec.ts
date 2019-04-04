import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteImageComponent } from './note-image.component';

describe('NoteImageComponent', () => {
  let component: NoteImageComponent;
  let fixture: ComponentFixture<NoteImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
