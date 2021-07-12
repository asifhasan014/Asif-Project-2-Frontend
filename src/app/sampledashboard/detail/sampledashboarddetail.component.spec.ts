import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampledashboarddetailComponent } from './sampledashboarddetail.component';

describe('SampledashboarddetailComponent', () => {
  let component: SampledashboarddetailComponent;
  let fixture: ComponentFixture<SampledashboarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampledashboarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampledashboarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
