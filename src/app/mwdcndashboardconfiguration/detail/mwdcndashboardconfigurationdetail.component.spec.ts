import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwdcndashboardconfigurationdetailComponent } from './mwdcndashboardconfigurationdetail.component';

describe('MwdcndashboardconfigurationdetailComponent', () => {
  let component: MwdcndashboardconfigurationdetailComponent;
  let fixture: ComponentFixture<MwdcndashboardconfigurationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwdcndashboardconfigurationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwdcndashboardconfigurationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
