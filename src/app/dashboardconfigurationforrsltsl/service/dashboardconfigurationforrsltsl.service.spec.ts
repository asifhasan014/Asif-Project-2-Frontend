import { TestBed, inject } from '@angular/core/testing';

import { DashboardconfigurationforrsltslService } from './dashboardconfigurationforrsltsl.service';

describe('DashboardconfigurationforrsltslService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardconfigurationforrsltslService]
    });
  });

  it('should be created', inject([DashboardconfigurationforrsltslService], (service: DashboardconfigurationforrsltslService) => {
    expect(service).toBeTruthy();
  }));
});
