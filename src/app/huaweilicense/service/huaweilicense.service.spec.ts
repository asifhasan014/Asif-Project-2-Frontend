import { TestBed, inject } from '@angular/core/testing';

import { HuaweilicenseService } from './huaweilicense.service';

describe('HuaweilicenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HuaweilicenseService]
    });
  });

  it('should be created', inject([HuaweilicenseService], (service: HuaweilicenseService) => {
    expect(service).toBeTruthy();
  }));
});
