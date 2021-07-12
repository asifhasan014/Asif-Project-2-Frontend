import { TestBed } from '@angular/core/testing';

import { UnusedandmostusedrulereportService } from './unusedandmostusedrulereport.service';

describe('UnusedandmostusedrulereportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnusedandmostusedrulereportService = TestBed.get(UnusedandmostusedrulereportService);
    expect(service).toBeTruthy();
  });
});
