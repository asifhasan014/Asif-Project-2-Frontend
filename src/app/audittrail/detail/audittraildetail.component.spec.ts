import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudittraildetailComponent } from './audittraildetail.component';

describe('AudittraildetailComponent', () => {
  let component: AudittraildetailComponent;
  let fixture: ComponentFixture<AudittraildetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudittraildetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudittraildetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
