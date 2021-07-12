import { TestBed, inject } from '@angular/core/testing';

import { MwdcndashboardconfigurationService } from './mwdcndashboardconfiguration.service';

describe('MwdcndashboardconfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwdcndashboardconfigurationService]
    });
  });

  it('should be created', inject([MwdcndashboardconfigurationService], (service: MwdcndashboardconfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
