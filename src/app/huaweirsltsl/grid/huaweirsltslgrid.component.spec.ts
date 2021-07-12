import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweirsltslgridComponent } from './huaweirsltslgrid.component';

describe('HuaweirsltslgridComponent', () => {
  let component: HuaweirsltslgridComponent;
  let fixture: ComponentFixture<HuaweirsltslgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweirsltslgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweirsltslgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
