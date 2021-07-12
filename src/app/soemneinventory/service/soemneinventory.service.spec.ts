import { TestBed, inject } from '@angular/core/testing';

import { SoemneinventoryService } from './soemneinventory.service';

describe('SoemneinventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoemneinventoryService]
    });
  });

  it('should be created', inject([SoemneinventoryService], (service: SoemneinventoryService) => {
    expect(service).toBeTruthy();
  }));
});
