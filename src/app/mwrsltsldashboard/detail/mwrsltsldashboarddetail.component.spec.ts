import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwrsltsldashboarddetailComponent } from './mwrsltsldashboarddetail.component';

describe('MwrsltsldashboarddetailComponent', () => {
  let component: MwrsltsldashboarddetailComponent;
  let fixture: ComponentFixture<MwrsltsldashboarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwrsltsldashboarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwrsltsldashboarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
