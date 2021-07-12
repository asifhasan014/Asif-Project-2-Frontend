import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingunusedfirewallrulegridComponent } from './pendingunusedfirewallrulegrid.component';

describe('PendingunusedfirewallrulegridComponent', () => {
  let component: PendingunusedfirewallrulegridComponent;
  let fixture: ComponentFixture<PendingunusedfirewallrulegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingunusedfirewallrulegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingunusedfirewallrulegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
