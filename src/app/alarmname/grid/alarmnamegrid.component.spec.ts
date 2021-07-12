import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmnamegridComponent } from './alarmnamegrid.component';

describe('AlarmnamegridComponent', () => {
  let component: AlarmnamegridComponent;
  let fixture: ComponentFixture<AlarmnamegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmnamegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmnamegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
