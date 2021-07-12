import { TestBed, inject } from '@angular/core/testing';

import { LicensingdashboardconfigurationService } from './licensingdashboardconfiguration.service';

describe('LicensingdashboardconfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicensingdashboardconfigurationService]
    });
  });

  it('should be created', inject([LicensingdashboardconfigurationService], (service: LicensingdashboardconfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
