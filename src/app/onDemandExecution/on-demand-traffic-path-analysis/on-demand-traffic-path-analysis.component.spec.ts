import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandTrafficPathAnalysisComponent } from './on-demand-traffic-path-analysis.component';

describe('OnDemandTrafficPathAnalysisComponent', () => {
  let component: OnDemandTrafficPathAnalysisComponent;
  let fixture: ComponentFixture<OnDemandTrafficPathAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDemandTrafficPathAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDemandTrafficPathAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
