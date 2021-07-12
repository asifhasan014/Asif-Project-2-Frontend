import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmchildComponent } from './alarmchild.component';

describe('AlarmchildComponent', () => {
  let component: AlarmchildComponent;
  let fixture: ComponentFixture<AlarmchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
