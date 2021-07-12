import { TestBed, inject } from '@angular/core/testing';

import { DcpowervendorService } from './dcpowervendor.service';

describe('DcpowervendorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DcpowervendorService]
    });
  });

  it('should be created', inject([DcpowervendorService], (service: DcpowervendorService) => {
    expect(service).toBeTruthy();
  }));
});
