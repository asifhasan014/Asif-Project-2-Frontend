import { TestBed, inject } from '@angular/core/testing';

import { SitewisedcavailabilityandldvalueService } from './sitewisedcavailabilityandldvalue.service';

describe('SitewisedcavailabilityandldvalueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitewisedcavailabilityandldvalueService]
    });
  });

  it('should be created', inject([SitewisedcavailabilityandldvalueService], (service: SitewisedcavailabilityandldvalueService) => {
    expect(service).toBeTruthy();
  }));
});
