import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwdcndashboarddetailComponent } from './mwdcndashboarddetail.component';

describe('MwdcndashboarddetailComponent', () => {
  let component: MwdcndashboarddetailComponent;
  let fixture: ComponentFixture<MwdcndashboarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwdcndashboarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwdcndashboarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
