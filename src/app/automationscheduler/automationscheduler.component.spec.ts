import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationschedulerComponent } from './automationscheduler.component';

describe('AutomationschedulerComponent', () => {
  let component: AutomationschedulerComponent;
  let fixture: ComponentFixture<AutomationschedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationschedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationschedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
