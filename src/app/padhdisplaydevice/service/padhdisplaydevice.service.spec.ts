import { TestBed, inject } from '@angular/core/testing';

import { PadhdisplaydeviceService } from './padhdisplaydevice.service';

describe('PadhdisplaydeviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PadhdisplaydeviceService]
    });
  });

  it('should be created', inject([PadhdisplaydeviceService], (service: PadhdisplaydeviceService) => {
    expect(service).toBeTruthy();
  }));
});
