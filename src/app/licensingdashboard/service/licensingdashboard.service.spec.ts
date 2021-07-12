import { TestBed, inject } from '@angular/core/testing';

import { LicensingdashboardService } from './licensingdashboard.service';

describe('LicensingdashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicensingdashboardService]
    });
  });

  it('should be created', inject([LicensingdashboardService], (service: LicensingdashboardService) => {
    expect(service).toBeTruthy();
  }));
});
