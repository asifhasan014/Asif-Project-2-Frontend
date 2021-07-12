import { TestBed, inject } from '@angular/core/testing';

import { LdsettlementldcalculationService } from './ldsettlementldcalculation.service';

describe('LdsettlementldcalculationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdsettlementldcalculationService]
    });
  });

  it('should be created', inject([LdsettlementldcalculationService], (service: LdsettlementldcalculationService) => {
    expect(service).toBeTruthy();
  }));
});
