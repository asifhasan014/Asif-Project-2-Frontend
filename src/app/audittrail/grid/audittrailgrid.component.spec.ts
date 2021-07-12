import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudittrailgridComponent } from './audittrailgrid.component';

describe('AudittrailgridComponent', () => {
  let component: AudittrailgridComponent;
  let fixture: ComponentFixture<AudittrailgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudittrailgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudittrailgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
