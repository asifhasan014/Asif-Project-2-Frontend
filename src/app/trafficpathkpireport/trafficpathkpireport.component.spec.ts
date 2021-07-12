import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficpathkpireportComponent } from './trafficpathkpireport.component';

describe('TrafficpathkpireportComponent', () => {
  let component: TrafficpathkpireportComponent;
  let fixture: ComponentFixture<TrafficpathkpireportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficpathkpireportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficpathkpireportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
