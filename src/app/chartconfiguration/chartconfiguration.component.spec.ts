import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartconfigurationComponent } from './chartconfiguration.component';

describe('ChartconfigurationComponent', () => {
  let component: ChartconfigurationComponent;
  let fixture: ComponentFixture<ChartconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
