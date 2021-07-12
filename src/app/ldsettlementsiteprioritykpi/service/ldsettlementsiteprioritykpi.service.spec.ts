import { TestBed, inject } from '@angular/core/testing';

import { LdsettlementsiteprioritykpiService } from './ldsettlementsiteprioritykpi.service';

describe('LdsettlementsiteprioritykpiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdsettlementsiteprioritykpiService]
    });
  });

  it('should be created', inject([LdsettlementsiteprioritykpiService], (service: LdsettlementsiteprioritykpiService) => {
    expect(service).toBeTruthy();
  }));
});
