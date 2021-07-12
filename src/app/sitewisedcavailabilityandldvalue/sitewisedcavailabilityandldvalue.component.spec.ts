import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitewisedcavailabilityandldvalueComponent } from './sitewisedcavailabilityandldvalue.component';

describe('SitewisedcavailabilityandldvalueComponent', () => {
  let component: SitewisedcavailabilityandldvalueComponent;
  let fixture: ComponentFixture<SitewisedcavailabilityandldvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitewisedcavailabilityandldvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitewisedcavailabilityandldvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
