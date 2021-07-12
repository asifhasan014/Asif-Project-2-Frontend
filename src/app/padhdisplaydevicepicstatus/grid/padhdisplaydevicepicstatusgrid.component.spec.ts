import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicepicstatusgridComponent } from './padhdisplaydevicepicstatusgrid.component';

describe('PadhdisplaydevicepicstatusgridComponent', () => {
  let component: PadhdisplaydevicepicstatusgridComponent;
  let fixture: ComponentFixture<PadhdisplaydevicepicstatusgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicepicstatusgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicepicstatusgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
