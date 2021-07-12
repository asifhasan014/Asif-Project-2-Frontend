import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhhealthverbosepredgridComponent } from './padhhealthverbosepredgrid.component';

describe('PadhhealthverbosepredgridComponent', () => {
  let component: PadhhealthverbosepredgridComponent;
  let fixture: ComponentFixture<PadhhealthverbosepredgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhhealthverbosepredgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhhealthverbosepredgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
