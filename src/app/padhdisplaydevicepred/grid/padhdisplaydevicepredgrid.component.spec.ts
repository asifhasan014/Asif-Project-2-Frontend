import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplaydevicepredgridComponent } from './padhdisplaydevicepredgrid.component';

describe('PadhdisplaydevicepredgridComponent', () => {
  let component: PadhdisplaydevicepredgridComponent;
  let fixture: ComponentFixture<PadhdisplaydevicepredgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplaydevicepredgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplaydevicepredgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
