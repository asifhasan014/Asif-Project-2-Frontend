import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingreportgridComponent } from './licensingreportgrid.component';

describe('LicensingreportgridComponent', () => {
  let component: LicensingreportgridComponent;
  let fixture: ComponentFixture<LicensingreportgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensingreportgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensingreportgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
