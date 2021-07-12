import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationschedulergridComponent } from './automationschedulergrid.component';

describe('AutomationschedulergridComponent', () => {
  let component: AutomationschedulergridComponent;
  let fixture: ComponentFixture<AutomationschedulergridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationschedulergridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationschedulergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
