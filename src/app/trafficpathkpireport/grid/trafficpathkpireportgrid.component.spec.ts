import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficpathkpireportgridComponent } from './trafficpathkpireportgrid.component';

describe('TrafficpathkpireportgridComponent', () => {
  let component: TrafficpathkpireportgridComponent;
  let fixture: ComponentFixture<TrafficpathkpireportgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficpathkpireportgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficpathkpireportgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
