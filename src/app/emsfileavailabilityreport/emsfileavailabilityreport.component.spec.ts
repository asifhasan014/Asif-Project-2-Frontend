import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsfileavailabilityreportComponent } from './emsfileavailabilityreport.component';

describe('EmsfileavailabilityreportComponent', () => {
  let component: EmsfileavailabilityreportComponent;
  let fixture: ComponentFixture<EmsfileavailabilityreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmsfileavailabilityreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmsfileavailabilityreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
