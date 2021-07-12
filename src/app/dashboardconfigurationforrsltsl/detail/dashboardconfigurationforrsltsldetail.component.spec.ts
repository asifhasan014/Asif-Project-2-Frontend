import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardconfigurationforrsltsldetailComponent } from './dashboardconfigurationforrsltsldetail.component';

describe('DashboardconfigurationforrsltsldetailComponent', () => {
  let component: DashboardconfigurationforrsltsldetailComponent;
  let fixture: ComponentFixture<DashboardconfigurationforrsltsldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardconfigurationforrsltsldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardconfigurationforrsltsldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
