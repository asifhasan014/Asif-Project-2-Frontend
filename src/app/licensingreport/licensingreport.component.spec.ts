import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingreportComponent } from './licensingreport.component';

describe('LicensingreportComponent', () => {
  let component: LicensingreportComponent;
  let fixture: ComponentFixture<LicensingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
