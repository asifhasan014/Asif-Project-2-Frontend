import { TestBed, inject } from '@angular/core/testing';

import { DcpowerrequestdevicetypeService } from './dcpowerrequestdevicetype.service';

describe('DcpowerrequestdevicetypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DcpowerrequestdevicetypeService]
    });
  });

  it('should be created', inject([DcpowerrequestdevicetypeService], (service: DcpowerrequestdevicetypeService) => {
    expect(service).toBeTruthy();
  }));
});
