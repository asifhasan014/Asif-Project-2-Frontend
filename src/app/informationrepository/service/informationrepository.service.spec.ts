import { TestBed, inject } from '@angular/core/testing';

import { InformationrepositoryService } from './informationrepository.service';

describe('InformationrepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InformationrepositoryService]
    });
  });

  it('should be created', inject([InformationrepositoryService], (service: InformationrepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
