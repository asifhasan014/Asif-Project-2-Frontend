import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwadaptivemodulationdashboardgridComponent } from './mwadaptivemodulationdashboardgrid.component';

describe('MwadaptivemodulationdashboardgridComponent', () => {
  let component: MwadaptivemodulationdashboardgridComponent;
  let fixture: ComponentFixture<MwadaptivemodulationdashboardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwadaptivemodulationdashboardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwadaptivemodulationdashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
