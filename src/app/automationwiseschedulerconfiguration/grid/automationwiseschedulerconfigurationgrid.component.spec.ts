import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationwiseschedulerconfigurationgridComponent } from './automationwiseschedulerconfigurationgrid.component';

describe('AutomationwiseschedulerconfigurationgridComponent', () => {
  let component: AutomationwiseschedulerconfigurationgridComponent;
  let fixture: ComponentFixture<AutomationwiseschedulerconfigurationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationwiseschedulerconfigurationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationwiseschedulerconfigurationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
