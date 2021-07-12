import { TestBed, inject } from '@angular/core/testing';

import { DcpowerrequesttypeService } from './dcpowerrequesttype.service';

describe('DcpowerrequesttypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DcpowerrequesttypeService]
    });
  });

  it('should be created', inject([DcpowerrequesttypeService], (service: DcpowerrequesttypeService) => {
    expect(service).toBeTruthy();
  }));
});
