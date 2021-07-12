import { TestBed, inject } from '@angular/core/testing';

import { LdsettlementmainsfailureService } from './ldsettlementmainsfailure.service';

describe('LdsettlementmainsfailureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdsettlementmainsfailureService]
    });
  });

  it('should be created', inject([LdsettlementmainsfailureService], (service: LdsettlementmainsfailureService) => {
    expect(service).toBeTruthy();
  }));
});
