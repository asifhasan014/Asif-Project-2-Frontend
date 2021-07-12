import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingdashboardconfigurationgridComponent } from './licensingdashboardconfigurationgrid.component';

describe('LicensingdashboardconfigurationgridComponent', () => {
  let component: LicensingdashboardconfigurationgridComponent;
  let fixture: ComponentFixture<LicensingdashboardconfigurationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensingdashboardconfigurationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensingdashboardconfigurationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
