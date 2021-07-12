import { TestBed, inject } from '@angular/core/testing';

import { LdsettlementsiteavailabilityService } from './ldsettlementsiteavailability.service';

describe('LdsettlementsiteavailabilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdsettlementsiteavailabilityService]
    });
  });

  it('should be created', inject([LdsettlementsiteavailabilityService], (service: LdsettlementsiteavailabilityService) => {
    expect(service).toBeTruthy();
  }));
});
