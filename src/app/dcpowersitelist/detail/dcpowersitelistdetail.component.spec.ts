import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowersitelistdetailComponent } from './dcpowersitelistdetail.component';

describe('DcpowersitelistdetailComponent', () => {
  let component: DcpowersitelistdetailComponent;
  let fixture: ComponentFixture<DcpowersitelistdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowersitelistdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowersitelistdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
