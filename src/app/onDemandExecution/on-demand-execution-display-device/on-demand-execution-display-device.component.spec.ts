import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandExecutionDisplayDeviceComponent } from './on-demand-execution-display-device.component';

describe('OnDemandExecutionDisplayDeviceComponent', () => {
  let component: OnDemandExecutionDisplayDeviceComponent;
  let fixture: ComponentFixture<OnDemandExecutionDisplayDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDemandExecutionDisplayDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDemandExecutionDisplayDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
