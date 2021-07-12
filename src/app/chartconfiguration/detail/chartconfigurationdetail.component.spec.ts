import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartconfigurationdetailComponent } from './chartconfigurationdetail.component';

describe('ChartconfigurationdetailComponent', () => {
  let component: ChartconfigurationdetailComponent;
  let fixture: ComponentFixture<ChartconfigurationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartconfigurationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartconfigurationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
