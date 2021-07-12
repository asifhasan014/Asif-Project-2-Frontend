import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensinghuaweidashboardComponent } from './licensinghuaweidashboard.component';

describe('LicensinghuaweidashboardComponent', () => {
  let component: LicensinghuaweidashboardComponent;
  let fixture: ComponentFixture<LicensinghuaweidashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensinghuaweidashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensinghuaweidashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
