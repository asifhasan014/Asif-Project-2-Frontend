import { TestBed, inject } from '@angular/core/testing';

import { LdsettlementincidentService } from './ldsettlementincident.service';

describe('LdsettlementincidentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdsettlementincidentService]
    });
  });

  it('should be created', inject([LdsettlementincidentService], (service: LdsettlementincidentService) => {
    expect(service).toBeTruthy();
  }));
});
