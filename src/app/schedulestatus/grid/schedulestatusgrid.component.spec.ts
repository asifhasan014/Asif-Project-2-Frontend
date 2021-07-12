import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulestatusgridComponent } from './schedulestatusgrid.component';

describe('SchedulestatusgridComponent', () => {
  let component: SchedulestatusgridComponent;
  let fixture: ComponentFixture<SchedulestatusgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulestatusgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulestatusgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
