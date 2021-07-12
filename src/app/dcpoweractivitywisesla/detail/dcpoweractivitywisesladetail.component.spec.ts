import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpoweractivitywisesladetailComponent } from './dcpoweractivitywisesladetail.component';

describe('DcpoweractivitywisesladetailComponent', () => {
  let component: DcpoweractivitywisesladetailComponent;
  let fixture: ComponentFixture<DcpoweractivitywisesladetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpoweractivitywisesladetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpoweractivitywisesladetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
