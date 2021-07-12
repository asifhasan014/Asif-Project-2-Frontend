import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevichealthvervosecpupredictiongridComponent } from './padhdisplaydevichealthvervosecpupredictiongrid.component';

describe('PadhdisplaydevichealthvervosecpupredictiongridComponent', () => {
  let component: PadhdisplaydevichealthvervosecpupredictiongridComponent;
  let fixture: ComponentFixture<PadhdisplaydevichealthvervosecpupredictiongridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevichealthvervosecpupredictiongridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevichealthvervosecpupredictiongridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
