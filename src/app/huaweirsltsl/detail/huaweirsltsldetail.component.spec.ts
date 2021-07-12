import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweirsltsldetailComponent } from './huaweirsltsldetail.component';

describe('HuaweirsltsldetailComponent', () => {
  let component: HuaweirsltsldetailComponent;
  let fixture: ComponentFixture<HuaweirsltsldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweirsltsldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweirsltsldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
