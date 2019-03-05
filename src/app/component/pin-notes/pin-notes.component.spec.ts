import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinNotesComponent } from './pin-notes.component';

describe('PinNotesComponent', () => {
  let component: PinNotesComponent;
  let fixture: ComponentFixture<PinNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
