import { TestBed, inject } from '@angular/core/testing';

import { RocService } from './roc.service';

describe('RocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RocService]
    });
  });

  it('should be created', inject([RocService], (service: RocService) => {
    expect(service).toBeTruthy();
  }));
});
