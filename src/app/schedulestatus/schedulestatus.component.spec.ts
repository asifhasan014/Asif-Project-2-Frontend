import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulestatusComponent } from './schedulestatus.component';

describe('SchedulestatusComponent', () => {
  let component: SchedulestatusComponent;
  let fixture: ComponentFixture<SchedulestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulestatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
