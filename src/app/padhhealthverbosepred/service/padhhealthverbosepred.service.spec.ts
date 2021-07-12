import { TestBed, inject } from '@angular/core/testing';

import { PadhhealthverbosepredService } from './padhhealthverbosepred.service';

describe('PadhhealthverbosepredService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PadhhealthverbosepredService]
    });
  });

  it('should be created', inject([PadhhealthverbosepredService], (service: PadhhealthverbosepredService) => {
    expect(service).toBeTruthy();
  }));
});
