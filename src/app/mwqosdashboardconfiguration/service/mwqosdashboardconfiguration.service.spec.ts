import { TestBed, inject } from '@angular/core/testing';

import { MwqosdashboardconfigurationService } from './mwqosdashboardconfiguration.service';

describe('MwqosdashboardconfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwqosdashboardconfigurationService]
    });
  });

  it('should be created', inject([MwqosdashboardconfigurationService], (service: MwqosdashboardconfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
