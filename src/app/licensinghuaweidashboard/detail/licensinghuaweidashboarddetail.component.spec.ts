import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensinghuaweidashboarddetailComponent } from './licensinghuaweidashboarddetail.component';

describe('LicensinghuaweidashboarddetailComponent', () => {
  let component: LicensinghuaweidashboarddetailComponent;
  let fixture: ComponentFixture<LicensinghuaweidashboarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensinghuaweidashboarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensinghuaweidashboarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
