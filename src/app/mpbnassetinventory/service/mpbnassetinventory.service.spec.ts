import { TestBed, inject } from '@angular/core/testing';

import { MpbnassetinventoryService } from './mpbnassetinventory.service';

describe('MpbnassetinventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MpbnassetinventoryService]
    });
  });

  it('should be created', inject([MpbnassetinventoryService], (service: MpbnassetinventoryService) => {
    expect(service).toBeTruthy();
  }));
});
