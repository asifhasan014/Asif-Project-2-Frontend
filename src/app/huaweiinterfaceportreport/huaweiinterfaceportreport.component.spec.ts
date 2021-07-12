import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweiinterfaceportreportComponent } from './huaweiinterfaceportreport.component';

describe('HuaweiinterfaceportreportComponent', () => {
  let component: HuaweiinterfaceportreportComponent;
  let fixture: ComponentFixture<HuaweiinterfaceportreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweiinterfaceportreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweiinterfaceportreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
