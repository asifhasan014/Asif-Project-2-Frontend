import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartconfigurationgridComponent } from './chartconfigurationgrid.component';

describe('ChartconfigurationgridComponent', () => {
  let component: ChartconfigurationgridComponent;
  let fixture: ComponentFixture<ChartconfigurationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartconfigurationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartconfigurationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
