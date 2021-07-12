import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevichealthvervosecpupredictiondetailComponent } from './padhdisplaydevichealthvervosecpupredictiondetail.component';

describe('PadhdisplaydevichealthvervosecpupredictiondetailComponent', () => {
  let component: PadhdisplaydevichealthvervosecpupredictiondetailComponent;
  let fixture: ComponentFixture<PadhdisplaydevichealthvervosecpupredictiondetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevichealthvervosecpupredictiondetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevichealthvervosecpupredictiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
