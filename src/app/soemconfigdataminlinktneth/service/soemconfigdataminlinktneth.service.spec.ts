import { TestBed, inject } from '@angular/core/testing';

import { SoemconfigdataminlinktnethService } from './soemconfigdataminlinktneth.service';

describe('SoemconfigdataminlinktnethService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoemconfigdataminlinktnethService]
    });
  });

  it('should be created', inject([SoemconfigdataminlinktnethService], (service: SoemconfigdataminlinktnethService) => {
    expect(service).toBeTruthy();
  }));
});
