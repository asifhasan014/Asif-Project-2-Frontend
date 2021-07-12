import { TestBed, inject } from '@angular/core/testing';

import { MwalarmdashboardService } from './mwalarmdashboard.service';

describe('MwalarmdashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwalarmdashboardService]
    });
  });

  it('should be created', inject([MwalarmdashboardService], (service: MwalarmdashboardService) => {
    expect(service).toBeTruthy();
  }));
});
