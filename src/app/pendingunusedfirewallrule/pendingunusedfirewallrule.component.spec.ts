import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingunusedfirewallruleComponent } from './pendingunusedfirewallrule.component';

describe('PendingunusedfirewallruleComponent', () => {
  let component: PendingunusedfirewallruleComponent;
  let fixture: ComponentFixture<PendingunusedfirewallruleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingunusedfirewallruleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingunusedfirewallruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
