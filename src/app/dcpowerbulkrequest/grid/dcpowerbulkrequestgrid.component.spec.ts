import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowerbulkrequestgridComponent } from './dcpowerbulkrequestgrid.component';

describe('DcpowerbulkrequestgridComponent', () => {
  let component: DcpowerbulkrequestgridComponent;
  let fixture: ComponentFixture<DcpowerbulkrequestgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowerbulkrequestgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowerbulkrequestgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
