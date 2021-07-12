import { TestBed, inject } from '@angular/core/testing';

import { PadhdisplaydevicepicstatusService } from './padhdisplaydevicepicstatus.service';

describe('PadhdisplaydevicepicstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PadhdisplaydevicepicstatusService]
    });
  });

  it('should be created', inject([PadhdisplaydevicepicstatusService], (service: PadhdisplaydevicepicstatusService) => {
    expect(service).toBeTruthy();
  }));
});
