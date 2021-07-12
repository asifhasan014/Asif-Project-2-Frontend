import { TestBed, inject } from '@angular/core/testing';

import { UserprioritymappingconfigurationvalueService } from './userprioritymappingconfigurationvalue.service';

describe('UserprioritymappingconfigurationvalueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserprioritymappingconfigurationvalueService]
    });
  });

  it('should be created', inject([UserprioritymappingconfigurationvalueService], (service: UserprioritymappingconfigurationvalueService) => {
    expect(service).toBeTruthy();
  }));
});
