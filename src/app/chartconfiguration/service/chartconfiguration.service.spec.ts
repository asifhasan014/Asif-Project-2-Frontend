import { TestBed, inject } from '@angular/core/testing';

import { ChartconfigurationService } from './chartconfiguration.service';

describe('ChartconfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartconfigurationService]
    });
  });

  it('should be created', inject([ChartconfigurationService], (service: ChartconfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
