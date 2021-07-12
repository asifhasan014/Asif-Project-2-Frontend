import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwserviceqosdashboardconfigurationdetailComponent } from './mwserviceqosdashboardconfigurationdetail.component';

describe('MwserviceqosdashboardconfigurationdetailComponent', () => {
  let component: MwserviceqosdashboardconfigurationdetailComponent;
  let fixture: ComponentFixture<MwserviceqosdashboardconfigurationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwserviceqosdashboardconfigurationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwserviceqosdashboardconfigurationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
