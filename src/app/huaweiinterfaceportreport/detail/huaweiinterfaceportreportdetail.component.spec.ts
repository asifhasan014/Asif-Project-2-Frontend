import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweiinterfaceportreportdetailComponent } from './huaweiinterfaceportreportdetail.component';

describe('HuaweiinterfaceportreportdetailComponent', () => {
  let component: HuaweiinterfaceportreportdetailComponent;
  let fixture: ComponentFixture<HuaweiinterfaceportreportdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweiinterfaceportreportdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweiinterfaceportreportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
