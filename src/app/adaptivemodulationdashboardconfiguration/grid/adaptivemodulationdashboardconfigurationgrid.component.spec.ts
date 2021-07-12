import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptivemodulationdashboardconfigurationgridComponent } from './adaptivemodulationdashboardconfigurationgrid.component';

describe('AdaptivemodulationdashboardconfigurationgridComponent', () => {
  let component: AdaptivemodulationdashboardconfigurationgridComponent;
  let fixture: ComponentFixture<AdaptivemodulationdashboardconfigurationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptivemodulationdashboardconfigurationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptivemodulationdashboardconfigurationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
