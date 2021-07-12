import { TestBed, inject } from '@angular/core/testing';

import { MwrsltsldashboardService } from './mwrsltsldashboard.service';

describe('MwrsltsldashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwrsltsldashboardService]
    });
  });

  it('should be created', inject([MwrsltsldashboardService], (service: MwrsltsldashboardService) => {
    expect(service).toBeTruthy();
  }));
});
