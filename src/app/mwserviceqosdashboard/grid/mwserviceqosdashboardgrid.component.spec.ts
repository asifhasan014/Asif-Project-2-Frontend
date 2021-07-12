import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwserviceqosdashboardgridComponent } from './mwserviceqosdashboardgrid.component';

describe('MwserviceqosdashboardgridComponent', () => {
  let component: MwserviceqosdashboardgridComponent;
  let fixture: ComponentFixture<MwserviceqosdashboardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwserviceqosdashboardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwserviceqosdashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
