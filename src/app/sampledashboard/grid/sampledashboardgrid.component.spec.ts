import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampledashboardgridComponent } from './sampledashboardgrid.component';

describe('SampledashboardgridComponent', () => {
  let component: SampledashboardgridComponent;
  let fixture: ComponentFixture<SampledashboardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampledashboardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampledashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
