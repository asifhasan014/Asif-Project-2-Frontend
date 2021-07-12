import { TestBed, inject } from '@angular/core/testing';

import { LinkfromdigitouchService } from './linkfromdigitouch.service';

describe('LinkfromdigitouchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkfromdigitouchService]
    });
  });

  it('should be created', inject([LinkfromdigitouchService], (service: LinkfromdigitouchService) => {
    expect(service).toBeTruthy();
  }));
});
