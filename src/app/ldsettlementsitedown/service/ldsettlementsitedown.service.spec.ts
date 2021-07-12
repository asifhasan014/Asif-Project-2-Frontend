import { TestBed, inject } from '@angular/core/testing';

import { LdsettlementsitedownService } from './ldsettlementsitedown.service';

describe('LdsettlementsitedownService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdsettlementsitedownService]
    });
  });

  it('should be created', inject([LdsettlementsitedownService], (service: LdsettlementsitedownService) => {
    expect(service).toBeTruthy();
  }));
});
