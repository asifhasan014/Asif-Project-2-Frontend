import { TestBed } from '@angular/core/testing';

import { DenyhitipreportService } from './denyhitipreport.service';

describe('DenyhitipreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DenyhitipreportService = TestBed.get(DenyhitipreportService);
    expect(service).toBeTruthy();
  });
});
