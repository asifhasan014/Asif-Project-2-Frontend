import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementsiteavailabilityComponent } from './ldsettlementsiteavailability.component';

describe('LdsettlementsiteavailabilityComponent', () => {
  let component: LdsettlementsiteavailabilityComponent;
  let fixture: ComponentFixture<LdsettlementsiteavailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementsiteavailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementsiteavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
