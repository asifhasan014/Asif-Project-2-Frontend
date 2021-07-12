import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicepicstatusComponent } from './padhdisplaydevicepicstatus.component';

describe('PadhdisplaydevicepicstatusComponent', () => {
  let component: PadhdisplaydevicepicstatusComponent;
  let fixture: ComponentFixture<PadhdisplaydevicepicstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicepicstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicepicstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
