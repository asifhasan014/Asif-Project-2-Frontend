import { TestBed, inject } from '@angular/core/testing';

import { HuaweiportutilizationService } from './huaweiportutilization.service';

describe('HuaweiportutilizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HuaweiportutilizationService]
    });
  });

  it('should be created', inject([HuaweiportutilizationService], (service: HuaweiportutilizationService) => {
    expect(service).toBeTruthy();
  }));
});
