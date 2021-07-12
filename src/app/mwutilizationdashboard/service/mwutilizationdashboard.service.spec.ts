import { TestBed, inject } from '@angular/core/testing';

import { MwutilizationdashboardService } from './mwutilizationdashboard.service';

describe('MwutilizationdashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwutilizationdashboardService]
    });
  });

  it('should be created', inject([MwutilizationdashboardService], (service: MwutilizationdashboardService) => {
    expect(service).toBeTruthy();
  }));
});
