import { TestBed, inject } from '@angular/core/testing';

import { RsltslvariationService } from './rsltslvariation.service';

describe('RsltslvariationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RsltslvariationService]
    });
  });

  it('should be created', inject([RsltslvariationService], (service: RsltslvariationService) => {
    expect(service).toBeTruthy();
  }));
});
