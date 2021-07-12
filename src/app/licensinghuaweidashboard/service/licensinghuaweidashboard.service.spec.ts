import { TestBed, inject } from '@angular/core/testing';

import { LicensinghuaweidashboardService } from './licensinghuaweidashboard.service';

describe('LicensinghuaweidashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicensinghuaweidashboardService]
    });
  });

  it('should be created', inject([LicensinghuaweidashboardService], (service: LicensinghuaweidashboardService) => {
    expect(service).toBeTruthy();
  }));
});
