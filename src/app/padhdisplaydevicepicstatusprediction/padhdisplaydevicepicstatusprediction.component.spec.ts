import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicepicstatuspredictionComponent } from './padhdisplaydevicepicstatusprediction.component';

describe('PadhdisplaydevicepicstatuspredictionComponent', () => {
  let component: PadhdisplaydevicepicstatuspredictionComponent;
  let fixture: ComponentFixture<PadhdisplaydevicepicstatuspredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicepicstatuspredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicepicstatuspredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
