import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensinghuaweidashboardgridComponent } from './licensinghuaweidashboardgrid.component';

describe('LicensinghuaweidashboardgridComponent', () => {
  let component: LicensinghuaweidashboardgridComponent;
  let fixture: ComponentFixture<LicensinghuaweidashboardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensinghuaweidashboardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensinghuaweidashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
