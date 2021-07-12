import { TestBed, inject } from '@angular/core/testing';

import { DcpoweritemwisewarrantyService } from './dcpoweritemwisewarranty.service';

describe('DcpoweritemwisewarrantyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DcpoweritemwisewarrantyService]
    });
  });

  it('should be created', inject([DcpoweritemwisewarrantyService], (service: DcpoweritemwisewarrantyService) => {
    expect(service).toBeTruthy();
  }));
});
