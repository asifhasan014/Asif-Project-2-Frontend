import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwqosdashboardconfigurationComponent } from './mwqosdashboardconfiguration.component';

describe('MwqosdashboardconfigurationComponent', () => {
  let component: MwqosdashboardconfigurationComponent;
  let fixture: ComponentFixture<MwqosdashboardconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwqosdashboardconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwqosdashboardconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
