import { TestBed, inject } from '@angular/core/testing';

import { AdaptivemodulationdashboardconfigurationService } from './adaptivemodulationdashboardconfiguration.service';

describe('AdaptivemodulationdashboardconfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdaptivemodulationdashboardconfigurationService]
    });
  });

  it('should be created', inject([AdaptivemodulationdashboardconfigurationService], (service: AdaptivemodulationdashboardconfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
