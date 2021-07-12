import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonlicensemoduleinventorygridComponent } from './ericssonlicensemoduleinventorygrid.component';

describe('EricssonlicensemoduleinventorygridComponent', () => {
  let component: EricssonlicensemoduleinventorygridComponent;
  let fixture: ComponentFixture<EricssonlicensemoduleinventorygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonlicensemoduleinventorygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonlicensemoduleinventorygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
