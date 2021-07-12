import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicepredComponent } from './padhdisplaydevicepred.component';

describe('PadhdisplaydevicepredComponent', () => {
  let component: PadhdisplaydevicepredComponent;
  let fixture: ComponentFixture<PadhdisplaydevicepredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicepredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicepredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
