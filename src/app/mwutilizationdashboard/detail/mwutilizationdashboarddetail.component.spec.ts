import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwutilizationdashboarddetailComponent } from './mwutilizationdashboarddetail.component';

describe('MwutilizationdashboarddetailComponent', () => {
  let component: MwutilizationdashboarddetailComponent;
  let fixture: ComponentFixture<MwutilizationdashboarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwutilizationdashboarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwutilizationdashboarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
