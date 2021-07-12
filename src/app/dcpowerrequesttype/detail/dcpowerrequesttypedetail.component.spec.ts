import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowerrequesttypedetailComponent } from './dcpowerrequesttypedetail.component';

describe('DcpowerrequesttypedetailComponent', () => {
  let component: DcpowerrequesttypedetailComponent;
  let fixture: ComponentFixture<DcpowerrequesttypedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowerrequesttypedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowerrequesttypedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
