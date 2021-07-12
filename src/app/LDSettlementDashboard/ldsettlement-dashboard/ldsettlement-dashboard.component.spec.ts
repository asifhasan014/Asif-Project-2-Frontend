import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementDashboardComponent } from './ldsettlement-dashboard.component';

describe('LdsettlementDashboardComponent', () => {
  let component: LdsettlementDashboardComponent;
  let fixture: ComponentFixture<LdsettlementDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
