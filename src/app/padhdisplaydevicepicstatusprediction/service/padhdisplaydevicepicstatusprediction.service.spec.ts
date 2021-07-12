import { TestBed, inject } from '@angular/core/testing';

import { PadhdisplaydevicepicstatuspredictionService } from './padhdisplaydevicepicstatusprediction.service';

describe('PadhdisplaydevicepicstatuspredictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PadhdisplaydevicepicstatuspredictionService]
    });
  });

  it('should be created', inject([PadhdisplaydevicepicstatuspredictionService], (service: PadhdisplaydevicepicstatuspredictionService) => {
    expect(service).toBeTruthy();
  }));
});
