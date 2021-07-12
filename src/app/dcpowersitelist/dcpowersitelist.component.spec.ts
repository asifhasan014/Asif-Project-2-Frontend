import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowersitelistComponent } from './dcpowersitelist.component';

describe('DcpowersitelistComponent', () => {
  let component: DcpowersitelistComponent;
  let fixture: ComponentFixture<DcpowersitelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowersitelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowersitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
