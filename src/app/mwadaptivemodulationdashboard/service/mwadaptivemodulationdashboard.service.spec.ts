import { TestBed, inject } from '@angular/core/testing';

import { MwadaptivemodulationdashboardService } from './mwadaptivemodulationdashboard.service';

describe('MwadaptivemodulationdashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwadaptivemodulationdashboardService]
    });
  });

  it('should be created', inject([MwadaptivemodulationdashboardService], (service: MwadaptivemodulationdashboardService) => {
    expect(service).toBeTruthy();
  }));
});
