import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationwiseschedulerconfigurationComponent } from './automationwiseschedulerconfiguration.component';

describe('AutomationwiseschedulerconfigurationComponent', () => {
  let component: AutomationwiseschedulerconfigurationComponent;
  let fixture: ComponentFixture<AutomationwiseschedulerconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationwiseschedulerconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationwiseschedulerconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
