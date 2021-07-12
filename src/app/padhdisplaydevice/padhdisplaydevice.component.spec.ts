import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydeviceComponent } from './padhdisplaydevice.component';

describe('PadhdisplaydeviceComponent', () => {
  let component: PadhdisplaydeviceComponent;
  let fixture: ComponentFixture<PadhdisplaydeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
