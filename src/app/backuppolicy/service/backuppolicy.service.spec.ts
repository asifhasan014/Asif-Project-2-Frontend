import { TestBed, inject } from '@angular/core/testing';

import { BackuppolicyService } from './backuppolicy.service';

describe('BackuppolicyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackuppolicyService]
    });
  });

  it('should be created', inject([BackuppolicyService], (service: BackuppolicyService) => {
    expect(service).toBeTruthy();
  }));
});
