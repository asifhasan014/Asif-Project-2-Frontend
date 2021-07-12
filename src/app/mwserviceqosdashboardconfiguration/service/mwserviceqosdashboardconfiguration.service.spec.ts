import { TestBed, inject } from '@angular/core/testing';

import { MwserviceqosdashboardconfigurationService } from './mwserviceqosdashboardconfiguration.service';

describe('MwserviceqosdashboardconfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwserviceqosdashboardconfigurationService]
    });
  });

  it('should be created', inject([MwserviceqosdashboardconfigurationService], (service: MwserviceqosdashboardconfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
