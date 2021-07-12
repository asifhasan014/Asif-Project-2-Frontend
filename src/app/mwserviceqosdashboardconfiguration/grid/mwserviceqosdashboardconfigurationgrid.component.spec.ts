import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwserviceqosdashboardconfigurationgridComponent } from './mwserviceqosdashboardconfigurationgrid.component';

describe('MwserviceqosdashboardconfigurationgridComponent', () => {
  let component: MwserviceqosdashboardconfigurationgridComponent;
  let fixture: ComponentFixture<MwserviceqosdashboardconfigurationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwserviceqosdashboardconfigurationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwserviceqosdashboardconfigurationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
