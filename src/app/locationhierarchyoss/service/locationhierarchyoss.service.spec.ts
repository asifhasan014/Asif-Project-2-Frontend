import { TestBed, inject } from '@angular/core/testing';

import { LocationhierarchyossService } from './locationhierarchyoss.service';

describe('LocationhierarchyossService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationhierarchyossService]
    });
  });

  it('should be created', inject([LocationhierarchyossService], (service: LocationhierarchyossService) => {
    expect(service).toBeTruthy();
  }));
});
