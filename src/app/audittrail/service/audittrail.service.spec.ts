import { TestBed, inject } from '@angular/core/testing';

import { AudittrailService } from './audittrail.service';

describe('AudittrailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudittrailService]
    });
  });

  it('should be created', inject([AudittrailService], (service: AudittrailService) => {
    expect(service).toBeTruthy();
  }));
});
