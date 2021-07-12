import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwqosdashboardconfigurationgridComponent } from './mwqosdashboardconfigurationgrid.component';

describe('MwqosdashboardconfigurationgridComponent', () => {
  let component: MwqosdashboardconfigurationgridComponent;
  let fixture: ComponentFixture<MwqosdashboardconfigurationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwqosdashboardconfigurationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwqosdashboardconfigurationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
