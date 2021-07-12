import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitewisedcavailabilityandldvaluedetailComponent } from './sitewisedcavailabilityandldvaluedetail.component';

describe('SitewisedcavailabilityandldvaluedetailComponent', () => {
  let component: SitewisedcavailabilityandldvaluedetailComponent;
  let fixture: ComponentFixture<SitewisedcavailabilityandldvaluedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitewisedcavailabilityandldvaluedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitewisedcavailabilityandldvaluedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
