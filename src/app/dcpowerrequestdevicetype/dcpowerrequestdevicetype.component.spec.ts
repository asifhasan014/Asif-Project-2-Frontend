import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowerrequestdevicetypeComponent } from './dcpowerrequestdevicetype.component';

describe('DcpowerrequestdevicetypeComponent', () => {
  let component: DcpowerrequestdevicetypeComponent;
  let fixture: ComponentFixture<DcpowerrequestdevicetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowerrequestdevicetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowerrequestdevicetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
