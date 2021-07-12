import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonlicensefalmoduleinventorydetailComponent } from './ericssonlicensefalmoduleinventorydetail.component';

describe('EricssonlicensefalmoduleinventorydetailComponent', () => {
  let component: EricssonlicensefalmoduleinventorydetailComponent;
  let fixture: ComponentFixture<EricssonlicensefalmoduleinventorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonlicensefalmoduleinventorydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonlicensefalmoduleinventorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
