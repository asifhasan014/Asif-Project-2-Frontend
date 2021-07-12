import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwqosdashboardconfigurationdetailComponent } from './mwqosdashboardconfigurationdetail.component';

describe('MwqosdashboardconfigurationdetailComponent', () => {
  let component: MwqosdashboardconfigurationdetailComponent;
  let fixture: ComponentFixture<MwqosdashboardconfigurationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwqosdashboardconfigurationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwqosdashboardconfigurationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
