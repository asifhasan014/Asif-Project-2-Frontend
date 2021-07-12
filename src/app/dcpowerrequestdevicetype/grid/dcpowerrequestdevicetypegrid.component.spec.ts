import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowerrequestdevicetypegridComponent } from './dcpowerrequestdevicetypegrid.component';

describe('DcpowerrequestdevicetypegridComponent', () => {
  let component: DcpowerrequestdevicetypegridComponent;
  let fixture: ComponentFixture<DcpowerrequestdevicetypegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowerrequestdevicetypegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowerrequestdevicetypegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
