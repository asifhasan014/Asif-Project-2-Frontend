import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowerrequesttypeComponent } from './dcpowerrequesttype.component';

describe('DcpowerrequesttypeComponent', () => {
  let component: DcpowerrequesttypeComponent;
  let fixture: ComponentFixture<DcpowerrequesttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowerrequesttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowerrequesttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
