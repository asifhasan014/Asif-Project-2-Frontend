import { TestBed, inject } from '@angular/core/testing';

import { UniqueinterfacetableforutilizationService } from './uniqueinterfacetableforutilization.service';

describe('UniqueinterfacetableforutilizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniqueinterfacetableforutilizationService]
    });
  });

  it('should be created', inject([UniqueinterfacetableforutilizationService], (service: UniqueinterfacetableforutilizationService) => {
    expect(service).toBeTruthy();
  }));
});
