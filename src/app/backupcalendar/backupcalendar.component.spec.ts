import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupcalendarComponent } from './backupcalendar.component';

describe('BackupcalendarComponent', () => {
  let component: BackupcalendarComponent;
  let fixture: ComponentFixture<BackupcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
