import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationdashboardconfigurationgridComponent } from './utilizationdashboardconfigurationgrid.component';

describe('UtilizationdashboardconfigurationgridComponent', () => {
  let component: UtilizationdashboardconfigurationgridComponent;
  let fixture: ComponentFixture<UtilizationdashboardconfigurationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizationdashboardconfigurationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationdashboardconfigurationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
