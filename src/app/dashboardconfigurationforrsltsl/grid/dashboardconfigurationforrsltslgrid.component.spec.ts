import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardconfigurationforrsltslgridComponent } from './dashboardconfigurationforrsltslgrid.component';

describe('DashboardconfigurationforrsltslgridComponent', () => {
  let component: DashboardconfigurationforrsltslgridComponent;
  let fixture: ComponentFixture<DashboardconfigurationforrsltslgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardconfigurationforrsltslgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardconfigurationforrsltslgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
