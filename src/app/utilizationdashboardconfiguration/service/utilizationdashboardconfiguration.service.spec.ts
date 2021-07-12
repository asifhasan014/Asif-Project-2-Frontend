import { TestBed, inject } from '@angular/core/testing';

import { UtilizationdashboardconfigurationService } from './utilizationdashboardconfiguration.service';

describe('UtilizationdashboardconfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilizationdashboardconfigurationService]
    });
  });

  it('should be created', inject([UtilizationdashboardconfigurationService], (service: UtilizationdashboardconfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
