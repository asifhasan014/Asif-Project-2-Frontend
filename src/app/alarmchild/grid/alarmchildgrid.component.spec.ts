import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmchildgridComponent } from './alarmchildgrid.component';

describe('AlarmchildgridComponent', () => {
  let component: AlarmchildgridComponent;
  let fixture: ComponentFixture<AlarmchildgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmchildgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmchildgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
