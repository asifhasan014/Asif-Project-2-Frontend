import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptivemodulationdashboardconfigurationComponent } from './adaptivemodulationdashboardconfiguration.component';

describe('AdaptivemodulationdashboardconfigurationComponent', () => {
  let component: AdaptivemodulationdashboardconfigurationComponent;
  let fixture: ComponentFixture<AdaptivemodulationdashboardconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptivemodulationdashboardconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptivemodulationdashboardconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
