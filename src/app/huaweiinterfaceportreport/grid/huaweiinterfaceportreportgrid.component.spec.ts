import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweiinterfaceportreportgridComponent } from './huaweiinterfaceportreportgrid.component';

describe('HuaweiinterfaceportreportgridComponent', () => {
  let component: HuaweiinterfaceportreportgridComponent;
  let fixture: ComponentFixture<HuaweiinterfaceportreportgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweiinterfaceportreportgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweiinterfaceportreportgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
