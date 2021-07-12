import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweirsltslComponent } from './huaweirsltsl.component';

describe('HuaweirsltslComponent', () => {
  let component: HuaweirsltslComponent;
  let fixture: ComponentFixture<HuaweirsltslComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweirsltslComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweirsltslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
