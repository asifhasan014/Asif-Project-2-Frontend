import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowersitelistgridComponent } from './dcpowersitelistgrid.component';

describe('DcpowersitelistgridComponent', () => {
  let component: DcpowersitelistgridComponent;
  let fixture: ComponentFixture<DcpowersitelistgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowersitelistgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowersitelistgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
