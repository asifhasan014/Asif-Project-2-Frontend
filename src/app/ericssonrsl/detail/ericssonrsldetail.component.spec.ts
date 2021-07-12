import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonrsldetailComponent } from './ericssonrsldetail.component';

describe('EricssonrsldetailComponent', () => {
  let component: EricssonrsldetailComponent;
  let fixture: ComponentFixture<EricssonrsldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonrsldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonrsldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
