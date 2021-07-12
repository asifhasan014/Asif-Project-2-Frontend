import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowerbulkrequestComponent } from './dcpowerbulkrequest.component';

describe('DcpowerbulkrequestComponent', () => {
  let component: DcpowerbulkrequestComponent;
  let fixture: ComponentFixture<DcpowerbulkrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowerbulkrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowerbulkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
