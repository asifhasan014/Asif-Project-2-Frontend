import { TestBed, inject } from '@angular/core/testing';

import { EricssonmodulationService } from './ericssonmodulation.service';

describe('EricssonmodulationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EricssonmodulationService]
    });
  });

  it('should be created', inject([EricssonmodulationService], (service: EricssonmodulationService) => {
    expect(service).toBeTruthy();
  }));
});
