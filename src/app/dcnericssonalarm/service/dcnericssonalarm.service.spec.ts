import { TestBed, inject } from '@angular/core/testing';

import { DcnericssonalarmService } from './dcnericssonalarm.service';

describe('DcnericssonalarmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DcnericssonalarmService]
    });
  });

  it('should be created', inject([DcnericssonalarmService], (service: DcnericssonalarmService) => {
    expect(service).toBeTruthy();
  }));
});
