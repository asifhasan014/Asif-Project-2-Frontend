import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwdcndashboardconfigurationComponent } from './mwdcndashboardconfiguration.component';

describe('MwdcndashboardconfigurationComponent', () => {
  let component: MwdcndashboardconfigurationComponent;
  let fixture: ComponentFixture<MwdcndashboardconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwdcndashboardconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwdcndashboardconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
