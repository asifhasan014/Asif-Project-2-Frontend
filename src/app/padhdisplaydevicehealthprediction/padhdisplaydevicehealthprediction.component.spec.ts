import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicehealthpredictionComponent } from './padhdisplaydevicehealthprediction.component';

describe('PadhdisplaydevicehealthpredictionComponent', () => {
  let component: PadhdisplaydevicehealthpredictionComponent;
  let fixture: ComponentFixture<PadhdisplaydevicehealthpredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicehealthpredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicehealthpredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
