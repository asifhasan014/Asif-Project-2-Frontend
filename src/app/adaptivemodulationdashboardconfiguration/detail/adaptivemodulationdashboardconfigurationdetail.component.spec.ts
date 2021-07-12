import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptivemodulationdashboardconfigurationdetailComponent } from './adaptivemodulationdashboardconfigurationdetail.component';

describe('AdaptivemodulationdashboardconfigurationdetailComponent', () => {
  let component: AdaptivemodulationdashboardconfigurationdetailComponent;
  let fixture: ComponentFixture<AdaptivemodulationdashboardconfigurationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptivemodulationdashboardconfigurationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptivemodulationdashboardconfigurationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
