import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashDialogBoxComponent } from './trash-dialog-box.component';

describe('TrashDialogBoxComponent', () => {
  let component: TrashDialogBoxComponent;
  let fixture: ComponentFixture<TrashDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
