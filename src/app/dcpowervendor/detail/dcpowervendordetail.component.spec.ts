import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowervendordetailComponent } from './dcpowervendordetail.component';

describe('DcpowervendordetailComponent', () => {
  let component: DcpowervendordetailComponent;
  let fixture: ComponentFixture<DcpowervendordetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowervendordetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowervendordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
