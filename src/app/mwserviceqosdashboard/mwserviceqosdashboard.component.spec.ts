import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwserviceqosdashboardComponent } from './mwserviceqosdashboard.component';

describe('MwserviceqosdashboardComponent', () => {
  let component: MwserviceqosdashboardComponent;
  let fixture: ComponentFixture<MwserviceqosdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwserviceqosdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwserviceqosdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
