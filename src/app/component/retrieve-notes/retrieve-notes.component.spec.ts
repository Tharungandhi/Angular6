import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievenotesComponent } from './retrieve-notes.component';

describe('AddnotesComponent', () => {
  let component: RetrievenotesComponent;
  let fixture: ComponentFixture<RetrievenotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrievenotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrievenotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
