import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicehealthpredictiondetailComponent } from './padhdisplaydevicehealthpredictiondetail.component';

describe('PadhdisplaydevicehealthpredictiondetailComponent', () => {
  let component: PadhdisplaydevicehealthpredictiondetailComponent;
  let fixture: ComponentFixture<PadhdisplaydevicehealthpredictiondetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicehealthpredictiondetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicehealthpredictiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
