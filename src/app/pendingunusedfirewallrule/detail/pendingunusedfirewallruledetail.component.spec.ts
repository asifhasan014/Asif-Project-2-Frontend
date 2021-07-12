import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingunusedfirewallruledetailComponent } from './pendingunusedfirewallruledetail.component';

describe('PendingunusedfirewallruledetailComponent', () => {
  let component: PendingunusedfirewallruledetailComponent;
  let fixture: ComponentFixture<PendingunusedfirewallruledetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingunusedfirewallruledetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingunusedfirewallruledetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
