import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingdashboardComponent } from './licensingdashboard.component';

describe('LicensingdashboardComponent', () => {
  let component: LicensingdashboardComponent;
  let fixture: ComponentFixture<LicensingdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensingdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensingdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
