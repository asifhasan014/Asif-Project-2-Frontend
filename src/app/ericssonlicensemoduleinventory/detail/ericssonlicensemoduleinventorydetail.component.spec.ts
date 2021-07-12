import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonlicensemoduleinventorydetailComponent } from './ericssonlicensemoduleinventorydetail.component';

describe('EricssonlicensemoduleinventorydetailComponent', () => {
  let component: EricssonlicensemoduleinventorydetailComponent;
  let fixture: ComponentFixture<EricssonlicensemoduleinventorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonlicensemoduleinventorydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonlicensemoduleinventorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
