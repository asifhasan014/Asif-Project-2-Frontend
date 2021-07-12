import { TestBed, inject } from '@angular/core/testing';

import { EmsfileavailabilityreportService } from './emsfileavailabilityreport.service';

describe('EmsfileavailabilityreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmsfileavailabilityreportService]
    });
  });

  it('should be created', inject([EmsfileavailabilityreportService], (service: EmsfileavailabilityreportService) => {
    expect(service).toBeTruthy();
  }));
});
