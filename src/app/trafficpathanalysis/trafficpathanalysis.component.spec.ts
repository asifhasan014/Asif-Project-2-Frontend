import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficpathanalysisComponent } from './trafficpathanalysis.component';

describe('TrafficpathanalysisComponent', () => {
  let component: TrafficpathanalysisComponent;
  let fixture: ComponentFixture<TrafficpathanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficpathanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficpathanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
