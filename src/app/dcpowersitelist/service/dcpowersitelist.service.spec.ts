import { TestBed, inject } from '@angular/core/testing';

import { DcpowersitelistService } from './dcpowersitelist.service';

describe('DcpowersitelistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DcpowersitelistService]
    });
  });

  it('should be created', inject([DcpowersitelistService], (service: DcpowersitelistService) => {
    expect(service).toBeTruthy();
  }));
});
