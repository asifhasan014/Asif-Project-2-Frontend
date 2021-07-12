import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingreportdetailComponent } from './licensingreportdetail.component';

describe('LicensingreportdetailComponent', () => {
  let component: LicensingreportdetailComponent;
  let fixture: ComponentFixture<LicensingreportdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensingreportdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensingreportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
