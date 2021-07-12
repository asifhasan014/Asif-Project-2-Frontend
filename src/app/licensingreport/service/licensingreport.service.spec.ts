import { TestBed, inject } from '@angular/core/testing';

import { LicensingreportService } from './licensingreport.service';

describe('LicensingreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicensingreportService]
    });
  });

  it('should be created', inject([LicensingreportService], (service: LicensingreportService) => {
    expect(service).toBeTruthy();
  }));
});
