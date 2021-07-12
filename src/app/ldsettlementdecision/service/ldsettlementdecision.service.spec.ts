import { TestBed, inject } from '@angular/core/testing';

import { LdsettlementdecisionService } from './ldsettlementdecision.service';

describe('LdsettlementdecisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdsettlementdecisionService]
    });
  });

  it('should be created', inject([LdsettlementdecisionService], (service: LdsettlementdecisionService) => {
    expect(service).toBeTruthy();
  }));
});
