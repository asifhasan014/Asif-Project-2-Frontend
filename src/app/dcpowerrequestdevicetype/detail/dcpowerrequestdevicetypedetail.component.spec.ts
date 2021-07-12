import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowerrequestdevicetypedetailComponent } from './dcpowerrequestdevicetypedetail.component';

describe('DcpowerrequestdevicetypedetailComponent', () => {
  let component: DcpowerrequestdevicetypedetailComponent;
  let fixture: ComponentFixture<DcpowerrequestdevicetypedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowerrequestdevicetypedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowerrequestdevicetypedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
