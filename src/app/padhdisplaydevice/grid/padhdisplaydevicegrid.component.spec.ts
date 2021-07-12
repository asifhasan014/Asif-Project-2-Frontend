import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicegridComponent } from './padhdisplaydevicegrid.component';

describe('PadhdisplaydevicegridComponent', () => {
  let component: PadhdisplaydevicegridComponent;
  let fixture: ComponentFixture<PadhdisplaydevicegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
