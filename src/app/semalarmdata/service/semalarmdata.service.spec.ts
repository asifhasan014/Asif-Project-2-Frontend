import { TestBed, inject } from '@angular/core/testing';

import { SemalarmdataService } from './semalarmdata.service';

describe('SemalarmdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SemalarmdataService]
    });
  });

  it('should be created', inject([SemalarmdataService], (service: SemalarmdataService) => {
    expect(service).toBeTruthy();
  }));
});
