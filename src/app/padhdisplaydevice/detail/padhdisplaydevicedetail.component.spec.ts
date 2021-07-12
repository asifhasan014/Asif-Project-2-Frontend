import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicedetailComponent } from './padhdisplaydevicedetail.component';

describe('PadhdisplaydevicedetailComponent', () => {
  let component: PadhdisplaydevicedetailComponent;
  let fixture: ComponentFixture<PadhdisplaydevicedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
