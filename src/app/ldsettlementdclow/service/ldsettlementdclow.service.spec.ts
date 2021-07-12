import { TestBed, inject } from '@angular/core/testing';

import { LdsettlementdclowService } from './ldsettlementdclow.service';

describe('LdsettlementdclowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdsettlementdclowService]
    });
  });

  it('should be created', inject([LdsettlementdclowService], (service: LdsettlementdclowService) => {
    expect(service).toBeTruthy();
  }));
});
