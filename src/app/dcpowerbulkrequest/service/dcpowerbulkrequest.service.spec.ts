import { TestBed, inject } from '@angular/core/testing';

import { DcpowerbulkrequestService } from './dcpowerbulkrequest.service';

describe('DcpowerbulkrequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DcpowerbulkrequestService]
    });
  });

  it('should be created', inject([DcpowerbulkrequestService], (service: DcpowerbulkrequestService) => {
    expect(service).toBeTruthy();
  }));
});
