import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationitemgridComponent } from './automationitemgrid.component';

describe('AutomationitemgridComponent', () => {
  let component: AutomationitemgridComponent;
  let fixture: ComponentFixture<AutomationitemgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationitemgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationitemgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
