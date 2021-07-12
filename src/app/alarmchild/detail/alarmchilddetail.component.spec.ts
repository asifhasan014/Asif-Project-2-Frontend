import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmchilddetailComponent } from './alarmchilddetail.component';

describe('AlarmchilddetailComponent', () => {
  let component: AlarmchilddetailComponent;
  let fixture: ComponentFixture<AlarmchilddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmchilddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmchilddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
