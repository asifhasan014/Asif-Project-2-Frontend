import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwserviceqosdashboarddetailComponent } from './mwserviceqosdashboarddetail.component';

describe('MwserviceqosdashboarddetailComponent', () => {
  let component: MwserviceqosdashboarddetailComponent;
  let fixture: ComponentFixture<MwserviceqosdashboarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwserviceqosdashboarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwserviceqosdashboarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
