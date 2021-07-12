import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationitemdetailComponent } from './automationitemdetail.component';

describe('AutomationitemdetailComponent', () => {
  let component: AutomationitemdetailComponent;
  let fixture: ComponentFixture<AutomationitemdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationitemdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationitemdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
