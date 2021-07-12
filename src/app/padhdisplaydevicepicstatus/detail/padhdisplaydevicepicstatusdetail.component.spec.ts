import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicepicstatusdetailComponent } from './padhdisplaydevicepicstatusdetail.component';

describe('PadhdisplaydevicepicstatusdetailComponent', () => {
  let component: PadhdisplaydevicepicstatusdetailComponent;
  let fixture: ComponentFixture<PadhdisplaydevicepicstatusdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicepicstatusdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicepicstatusdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
