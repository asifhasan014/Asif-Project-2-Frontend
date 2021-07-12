import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationdashboardconfigurationdetailComponent } from './utilizationdashboardconfigurationdetail.component';

describe('UtilizationdashboardconfigurationdetailComponent', () => {
  let component: UtilizationdashboardconfigurationdetailComponent;
  let fixture: ComponentFixture<UtilizationdashboardconfigurationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizationdashboardconfigurationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationdashboardconfigurationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
