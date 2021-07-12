import { TestBed, inject } from '@angular/core/testing';

import { LdsettlementgensetonloadreportService } from './ldsettlementgensetonloadreport.service';

describe('LdsettlementgensetonloadreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdsettlementgensetonloadreportService]
    });
  });

  it('should be created', inject([LdsettlementgensetonloadreportService], (service: LdsettlementgensetonloadreportService) => {
    expect(service).toBeTruthy();
  }));
});
