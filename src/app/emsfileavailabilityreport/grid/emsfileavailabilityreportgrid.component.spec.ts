import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsfileavailabilityreportgridComponent } from './emsfileavailabilityreportgrid.component';

describe('EmsfileavailabilityreportgridComponent', () => {
  let component: EmsfileavailabilityreportgridComponent;
  let fixture: ComponentFixture<EmsfileavailabilityreportgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmsfileavailabilityreportgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmsfileavailabilityreportgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
