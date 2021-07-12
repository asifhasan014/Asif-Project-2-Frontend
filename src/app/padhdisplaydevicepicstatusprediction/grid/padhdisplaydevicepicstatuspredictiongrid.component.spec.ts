import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicepicstatuspredictiongridComponent } from './padhdisplaydevicepicstatuspredictiongrid.component';

describe('PadhdisplaydevicepicstatuspredictiongridComponent', () => {
  let component: PadhdisplaydevicepicstatuspredictiongridComponent;
  let fixture: ComponentFixture<PadhdisplaydevicepicstatuspredictiongridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicepicstatuspredictiongridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicepicstatuspredictiongridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
