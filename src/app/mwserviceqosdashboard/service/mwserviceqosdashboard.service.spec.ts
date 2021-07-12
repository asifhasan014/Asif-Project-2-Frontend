import { TestBed, inject } from '@angular/core/testing';

import { MwserviceqosdashboardService } from './mwserviceqosdashboard.service';

describe('MwserviceqosdashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwserviceqosdashboardService]
    });
  });

  it('should be created', inject([MwserviceqosdashboardService], (service: MwserviceqosdashboardService) => {
    expect(service).toBeTruthy();
  }));
});
