import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationwiseschedulerconfigurationdetailComponent } from './automationwiseschedulerconfigurationdetail.component';

describe('AutomationwiseschedulerconfigurationdetailComponent', () => {
  let component: AutomationwiseschedulerconfigurationdetailComponent;
  let fixture: ComponentFixture<AutomationwiseschedulerconfigurationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationwiseschedulerconfigurationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationwiseschedulerconfigurationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
