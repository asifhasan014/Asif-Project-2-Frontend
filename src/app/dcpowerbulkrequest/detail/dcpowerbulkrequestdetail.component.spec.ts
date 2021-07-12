import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowerbulkrequestdetailComponent } from './dcpowerbulkrequestdetail.component';

describe('DcpowerbulkrequestdetailComponent', () => {
  let component: DcpowerbulkrequestdetailComponent;
  let fixture: ComponentFixture<DcpowerbulkrequestdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowerbulkrequestdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowerbulkrequestdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
