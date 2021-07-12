import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevichealthvervosecpupredictionComponent } from './padhdisplaydevichealthvervosecpuprediction.component';

describe('PadhdisplaydevichealthvervosecpupredictionComponent', () => {
  let component: PadhdisplaydevichealthvervosecpupredictionComponent;
  let fixture: ComponentFixture<PadhdisplaydevichealthvervosecpupredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevichealthvervosecpupredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevichealthvervosecpupredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
