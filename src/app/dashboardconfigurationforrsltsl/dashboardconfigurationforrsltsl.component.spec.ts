import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardconfigurationforrsltslComponent } from './dashboardconfigurationforrsltsl.component';

describe('DashboardconfigurationforrsltslComponent', () => {
  let component: DashboardconfigurationforrsltslComponent;
  let fixture: ComponentFixture<DashboardconfigurationforrsltslComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardconfigurationforrsltslComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardconfigurationforrsltslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
