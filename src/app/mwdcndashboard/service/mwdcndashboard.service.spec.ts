import { TestBed, inject } from '@angular/core/testing';

import { MwdcndashboardService } from './mwdcndashboard.service';

describe('MwdcndashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwdcndashboardService]
    });
  });

  it('should be created', inject([MwdcndashboardService], (service: MwdcndashboardService) => {
    expect(service).toBeTruthy();
  }));
});
