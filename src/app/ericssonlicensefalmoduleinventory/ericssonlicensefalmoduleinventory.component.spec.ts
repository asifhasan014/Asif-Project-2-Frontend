import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonlicensefalmoduleinventoryComponent } from './ericssonlicensefalmoduleinventory.component';

describe('EricssonlicensefalmoduleinventoryComponent', () => {
  let component: EricssonlicensefalmoduleinventoryComponent;
  let fixture: ComponentFixture<EricssonlicensefalmoduleinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonlicensefalmoduleinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonlicensefalmoduleinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
