import { TestBed, inject } from '@angular/core/testing';

import { LdsettlementexternalalarmService } from './ldsettlementexternalalarm.service';

describe('LdsettlementexternalalarmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdsettlementexternalalarmService]
    });
  });

  it('should be created', inject([LdsettlementexternalalarmService], (service: LdsettlementexternalalarmService) => {
    expect(service).toBeTruthy();
  }));
});
