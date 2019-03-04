import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepSidebarComponent } from './keep-sidebar.component';

describe('KeepSidebarComponent', () => {
  let component: KeepSidebarComponent;
  let fixture: ComponentFixture<KeepSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
