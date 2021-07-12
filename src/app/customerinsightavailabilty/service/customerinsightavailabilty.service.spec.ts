import { TestBed, inject } from '@angular/core/testing';

import { CustomerinsightavailabiltyService } from './customerinsightavailabilty.service';

describe('CustomerinsightavailabiltyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerinsightavailabiltyService]
    });
  });

  it('should be created', inject([CustomerinsightavailabiltyService], (service: CustomerinsightavailabiltyService) => {
    expect(service).toBeTruthy();
  }));
});
