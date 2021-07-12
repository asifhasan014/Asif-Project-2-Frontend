import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandHealthCheckComponent } from './on-demand-health-check.component';

describe('OnDemandHealthCheckComponent', () => {
  let component: OnDemandHealthCheckComponent;
  let fixture: ComponentFixture<OnDemandHealthCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDemandHealthCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDemandHealthCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
