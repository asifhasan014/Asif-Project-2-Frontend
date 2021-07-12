import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficpathanalysisgridComponent } from './trafficpathanalysisgrid.component';

describe('TrafficpathanalysisgridComponent', () => {
  let component: TrafficpathanalysisgridComponent;
  let fixture: ComponentFixture<TrafficpathanalysisgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficpathanalysisgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficpathanalysisgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
