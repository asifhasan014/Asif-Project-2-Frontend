import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingdashboardconfigurationComponent } from './licensingdashboardconfiguration.component';

describe('LicensingdashboardconfigurationComponent', () => {
  let component: LicensingdashboardconfigurationComponent;
  let fixture: ComponentFixture<LicensingdashboardconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensingdashboardconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensingdashboardconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
