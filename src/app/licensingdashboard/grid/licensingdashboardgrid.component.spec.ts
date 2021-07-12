import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingdashboardgridComponent } from './licensingdashboardgrid.component';

describe('LicensingdashboardgridComponent', () => {
  let component: LicensingdashboardgridComponent;
  let fixture: ComponentFixture<LicensingdashboardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensingdashboardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensingdashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
