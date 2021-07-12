import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwrsltsldashboardgridComponent } from './mwrsltsldashboardgrid.component';

describe('MwrsltsldashboardgridComponent', () => {
  let component: MwrsltsldashboardgridComponent;
  let fixture: ComponentFixture<MwrsltsldashboardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwrsltsldashboardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwrsltsldashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
