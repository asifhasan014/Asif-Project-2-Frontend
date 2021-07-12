import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowerrequesttypegridComponent } from './dcpowerrequesttypegrid.component';

describe('DcpowerrequesttypegridComponent', () => {
  let component: DcpowerrequesttypegridComponent;
  let fixture: ComponentFixture<DcpowerrequesttypegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowerrequesttypegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowerrequesttypegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
