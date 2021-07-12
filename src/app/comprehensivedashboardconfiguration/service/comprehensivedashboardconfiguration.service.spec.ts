import { TestBed, inject } from '@angular/core/testing';

import { ComprehensivedashboardconfigurationService } from './comprehensivedashboardconfiguration.service';

describe('ComprehensivedashboardconfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprehensivedashboardconfigurationService]
    });
  });

  it('should be created', inject([ComprehensivedashboardconfigurationService], (service: ComprehensivedashboardconfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
