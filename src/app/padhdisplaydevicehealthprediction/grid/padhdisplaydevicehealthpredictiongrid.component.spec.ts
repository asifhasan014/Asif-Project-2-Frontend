import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicehealthpredictiongridComponent } from './padhdisplaydevicehealthpredictiongrid.component';

describe('PadhdisplaydevicehealthpredictiongridComponent', () => {
  let component: PadhdisplaydevicehealthpredictiongridComponent;
  let fixture: ComponentFixture<PadhdisplaydevicehealthpredictiongridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicehealthpredictiongridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicehealthpredictiongridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
