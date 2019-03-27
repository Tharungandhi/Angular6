import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlabelNotesComponent } from './addlabel-notes.component';

fdescribe('AddlabelNotesComponent', () => {
  let component: AddlabelNotesComponent;
  let fixture: ComponentFixture<AddlabelNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlabelNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlabelNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
