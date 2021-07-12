import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonlicensefalmoduleinventorygridComponent } from './ericssonlicensefalmoduleinventorygrid.component';

describe('EricssonlicensefalmoduleinventorygridComponent', () => {
  let component: EricssonlicensefalmoduleinventorygridComponent;
  let fixture: ComponentFixture<EricssonlicensefalmoduleinventorygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonlicensefalmoduleinventorygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonlicensefalmoduleinventorygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
