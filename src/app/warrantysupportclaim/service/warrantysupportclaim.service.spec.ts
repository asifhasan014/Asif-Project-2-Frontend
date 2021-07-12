import { TestBed, inject } from '@angular/core/testing';

import { WarrantysupportclaimService } from './warrantysupportclaim.service';

describe('WarrantysupportclaimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarrantysupportclaimService]
    });
  });

  it('should be created', inject([WarrantysupportclaimService], (service: WarrantysupportclaimService) => {
    expect(service).toBeTruthy();
  }));
});
