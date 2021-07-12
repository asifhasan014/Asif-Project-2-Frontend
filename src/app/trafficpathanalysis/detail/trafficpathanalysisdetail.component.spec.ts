import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficpathanalysisdetailComponent } from './trafficpathanalysisdetail.component';

describe('TrafficpathanalysisdetailComponent', () => {
  let component: TrafficpathanalysisdetailComponent;
  let fixture: ComponentFixture<TrafficpathanalysisdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficpathanalysisdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficpathanalysisdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
