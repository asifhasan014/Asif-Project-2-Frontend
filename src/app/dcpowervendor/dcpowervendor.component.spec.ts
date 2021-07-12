import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowervendorComponent } from './dcpowervendor.component';

describe('DcpowervendorComponent', () => {
  let component: DcpowervendorComponent;
  let fixture: ComponentFixture<DcpowervendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowervendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowervendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
