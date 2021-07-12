import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulestatusdetailComponent } from './schedulestatusdetail.component';

describe('SchedulestatusdetailComponent', () => {
  let component: SchedulestatusdetailComponent;
  let fixture: ComponentFixture<SchedulestatusdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulestatusdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulestatusdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
