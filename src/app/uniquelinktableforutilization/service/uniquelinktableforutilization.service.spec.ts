import { TestBed, inject } from '@angular/core/testing';

import { UniquelinktableforutilizationService } from './uniquelinktableforutilization.service';

describe('UniquelinktableforutilizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniquelinktableforutilizationService]
    });
  });

  it('should be created', inject([UniquelinktableforutilizationService], (service: UniquelinktableforutilizationService) => {
    expect(service).toBeTruthy();
  }));
});
