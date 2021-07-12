import { TestBed, inject } from '@angular/core/testing';

import { ServerhealthreportService } from './serverhealthreport.service';

describe('ServerhealthreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerhealthreportService]
    });
  });

  it('should be created', inject([ServerhealthreportService], (service: ServerhealthreportService) => {
    expect(service).toBeTruthy();
  }));
});
