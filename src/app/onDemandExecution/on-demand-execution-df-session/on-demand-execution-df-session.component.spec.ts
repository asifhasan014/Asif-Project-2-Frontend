import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandExecutionDfSessionComponent } from './on-demand-execution-df-session.component';

describe('OnDemandExecutionDfSessionComponent', () => {
  let component: OnDemandExecutionDfSessionComponent;
  let fixture: ComponentFixture<OnDemandExecutionDfSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDemandExecutionDfSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDemandExecutionDfSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
