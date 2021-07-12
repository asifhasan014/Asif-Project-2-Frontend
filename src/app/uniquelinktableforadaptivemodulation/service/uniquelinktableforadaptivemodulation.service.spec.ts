import { TestBed, inject } from '@angular/core/testing';

import { UniquelinktableforadaptivemodulationService } from './uniquelinktableforadaptivemodulation.service';

describe('UniquelinktableforadaptivemodulationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniquelinktableforadaptivemodulationService]
    });
  });

  it('should be created', inject([UniquelinktableforadaptivemodulationService], (service: UniquelinktableforadaptivemodulationService) => {
    expect(service).toBeTruthy();
  }));
});
