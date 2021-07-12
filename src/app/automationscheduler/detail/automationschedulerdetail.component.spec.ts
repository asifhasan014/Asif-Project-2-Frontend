import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationschedulerdetailComponent } from './automationschedulerdetail.component';

describe('AutomationschedulerdetailComponent', () => {
  let component: AutomationschedulerdetailComponent;
  let fixture: ComponentFixture<AutomationschedulerdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationschedulerdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationschedulerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
