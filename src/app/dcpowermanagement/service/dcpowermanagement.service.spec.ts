import { TestBed, inject } from '@angular/core/testing';

import { DcpowermanagementService } from './dcpowermanagement.service';

describe('DcpowermanagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DcpowermanagementService]
    });
  });

  it('should be created', inject([DcpowermanagementService], (service: DcpowermanagementService) => {
    expect(service).toBeTruthy();
  }));
});
