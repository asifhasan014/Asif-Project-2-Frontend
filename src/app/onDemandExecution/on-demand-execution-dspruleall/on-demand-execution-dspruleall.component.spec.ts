import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandExecutionDspruleallComponent } from './on-demand-execution-dspruleall.component';

describe('OnDemandExecutionDspruleallComponent', () => {
  let component: OnDemandExecutionDspruleallComponent;
  let fixture: ComponentFixture<OnDemandExecutionDspruleallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDemandExecutionDspruleallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDemandExecutionDspruleallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
