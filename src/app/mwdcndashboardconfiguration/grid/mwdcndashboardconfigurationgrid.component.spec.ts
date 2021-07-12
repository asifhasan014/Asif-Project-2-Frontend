import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwdcndashboardconfigurationgridComponent } from './mwdcndashboardconfigurationgrid.component';

describe('MwdcndashboardconfigurationgridComponent', () => {
  let component: MwdcndashboardconfigurationgridComponent;
  let fixture: ComponentFixture<MwdcndashboardconfigurationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwdcndashboardconfigurationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwdcndashboardconfigurationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
