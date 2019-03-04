import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepHeaderComponent } from './keep-header.component';

describe('KeepHeaderComponent', () => {
  let component: KeepHeaderComponent;
  let fixture: ComponentFixture<KeepHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
