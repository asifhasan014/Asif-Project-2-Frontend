import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationitemComponent } from './automationitem.component';

describe('AutomationitemComponent', () => {
  let component: AutomationitemComponent;
  let fixture: ComponentFixture<AutomationitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
