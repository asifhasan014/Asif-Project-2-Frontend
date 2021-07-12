import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingdashboardconfigurationdetailComponent } from './licensingdashboardconfigurationdetail.component';

describe('LicensingdashboardconfigurationdetailComponent', () => {
  let component: LicensingdashboardconfigurationdetailComponent;
  let fixture: ComponentFixture<LicensingdashboardconfigurationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensingdashboardconfigurationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensingdashboardconfigurationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
