import { TestBed, inject } from '@angular/core/testing';

import { EricssonlicensemoduleinventoryService } from './ericssonlicensemoduleinventory.service';

describe('EricssonlicensemoduleinventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EricssonlicensemoduleinventoryService]
    });
  });

  it('should be created', inject([EricssonlicensemoduleinventoryService], (service: EricssonlicensemoduleinventoryService) => {
    expect(service).toBeTruthy();
  }));
});
