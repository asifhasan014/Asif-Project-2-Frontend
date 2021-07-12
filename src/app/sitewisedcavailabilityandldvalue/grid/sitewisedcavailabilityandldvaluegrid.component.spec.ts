import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitewisedcavailabilityandldvaluegridComponent } from './sitewisedcavailabilityandldvaluegrid.component';

describe('SitewisedcavailabilityandldvaluegridComponent', () => {
  let component: SitewisedcavailabilityandldvaluegridComponent;
  let fixture: ComponentFixture<SitewisedcavailabilityandldvaluegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitewisedcavailabilityandldvaluegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitewisedcavailabilityandldvaluegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
