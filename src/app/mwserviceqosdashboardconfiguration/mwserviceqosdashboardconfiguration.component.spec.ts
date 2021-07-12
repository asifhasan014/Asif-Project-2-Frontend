import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwserviceqosdashboardconfigurationComponent } from './mwserviceqosdashboardconfiguration.component';

describe('MwserviceqosdashboardconfigurationComponent', () => {
  let component: MwserviceqosdashboardconfigurationComponent;
  let fixture: ComponentFixture<MwserviceqosdashboardconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwserviceqosdashboardconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwserviceqosdashboardconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
