import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonlicensemoduleinventoryComponent } from './ericssonlicensemoduleinventory.component';

describe('EricssonlicensemoduleinventoryComponent', () => {
  let component: EricssonlicensemoduleinventoryComponent;
  let fixture: ComponentFixture<EricssonlicensemoduleinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonlicensemoduleinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonlicensemoduleinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
