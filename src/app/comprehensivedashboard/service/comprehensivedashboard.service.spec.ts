import { TestBed, inject } from '@angular/core/testing';

import { ComprehensivedashboardService } from './comprehensivedashboard.service';

describe('ComprehensivedashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprehensivedashboardService]
    });
  });

  it('should be created', inject([ComprehensivedashboardService], (service: ComprehensivedashboardService) => {
    expect(service).toBeTruthy();
  }));
});
