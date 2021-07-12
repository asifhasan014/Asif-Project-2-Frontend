import { TestBed, inject } from '@angular/core/testing';

import { DcpoweractivitywiseslaService } from './dcpoweractivitywisesla.service';

describe('DcpoweractivitywiseslaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DcpoweractivitywiseslaService]
    });
  });

  it('should be created', inject([DcpoweractivitywiseslaService], (service: DcpoweractivitywiseslaService) => {
    expect(service).toBeTruthy();
  }));
});
