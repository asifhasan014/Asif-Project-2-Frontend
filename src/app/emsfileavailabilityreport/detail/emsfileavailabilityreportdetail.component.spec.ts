import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsfileavailabilityreportdetailComponent } from './emsfileavailabilityreportdetail.component';

describe('EmsfileavailabilityreportdetailComponent', () => {
  let component: EmsfileavailabilityreportdetailComponent;
  let fixture: ComponentFixture<EmsfileavailabilityreportdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmsfileavailabilityreportdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmsfileavailabilityreportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
