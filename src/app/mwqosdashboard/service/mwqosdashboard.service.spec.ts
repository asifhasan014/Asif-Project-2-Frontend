import { TestBed, inject } from '@angular/core/testing';

import { MwqosdashboardService } from './mwqosdashboard.service';

describe('MwqosdashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwqosdashboardService]
    });
  });

  it('should be created', inject([MwqosdashboardService], (service: MwqosdashboardService) => {
    expect(service).toBeTruthy();
  }));
});
