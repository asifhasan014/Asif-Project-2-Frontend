import { TestBed, inject } from '@angular/core/testing';

import { EricssonlicensefalmoduleinventoryService } from './ericssonlicensefalmoduleinventory.service';

describe('EricssonlicensefalmoduleinventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EricssonlicensefalmoduleinventoryService]
    });
  });

  it('should be created', inject([EricssonlicensefalmoduleinventoryService], (service: EricssonlicensefalmoduleinventoryService) => {
    expect(service).toBeTruthy();
  }));
});
