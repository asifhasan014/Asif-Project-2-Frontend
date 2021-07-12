import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficpathkpireportdetailComponent } from './trafficpathkpireportdetail.component';

describe('TrafficpathkpireportdetailComponent', () => {
  let component: TrafficpathkpireportdetailComponent;
  let fixture: ComponentFixture<TrafficpathkpireportdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficpathkpireportdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficpathkpireportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
