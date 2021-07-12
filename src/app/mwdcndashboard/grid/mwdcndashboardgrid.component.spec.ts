import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwdcndashboardgridComponent } from './mwdcndashboardgrid.component';

describe('MwdcndashboardgridComponent', () => {
  let component: MwdcndashboardgridComponent;
  let fixture: ComponentFixture<MwdcndashboardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwdcndashboardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwdcndashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
