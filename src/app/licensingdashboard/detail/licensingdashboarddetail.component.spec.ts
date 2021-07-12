import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingdashboarddetailComponent } from './licensingdashboarddetail.component';

describe('LicensingdashboarddetailComponent', () => {
  let component: LicensingdashboarddetailComponent;
  let fixture: ComponentFixture<LicensingdashboarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensingdashboarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensingdashboarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
