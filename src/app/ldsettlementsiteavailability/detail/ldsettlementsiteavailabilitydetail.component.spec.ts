import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementsiteavailabilitydetailComponent } from './ldsettlementsiteavailabilitydetail.component';

describe('LdsettlementsiteavailabilitydetailComponent', () => {
  let component: LdsettlementsiteavailabilitydetailComponent;
  let fixture: ComponentFixture<LdsettlementsiteavailabilitydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementsiteavailabilitydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementsiteavailabilitydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
