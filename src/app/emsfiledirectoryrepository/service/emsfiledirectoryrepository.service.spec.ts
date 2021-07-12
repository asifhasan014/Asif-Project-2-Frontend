import { TestBed, inject } from '@angular/core/testing';

import { EmsfiledirectoryrepositoryService } from './emsfiledirectoryrepository.service';

describe('EmsfiledirectoryrepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmsfiledirectoryrepositoryService]
    });
  });

  it('should be created', inject([EmsfiledirectoryrepositoryService], (service: EmsfiledirectoryrepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
