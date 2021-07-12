import { TestBed, inject } from '@angular/core/testing';

import { LdsettlementpgService } from './ldsettlementpg.service';

describe('LdsettlementpgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdsettlementpgService]
    });
  });

  it('should be created', inject([LdsettlementpgService], (service: LdsettlementpgService) => {
    expect(service).toBeTruthy();
  }));
});
