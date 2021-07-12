import { TestBed, inject } from '@angular/core/testing';

import { PadhdisplaydevicehealthpredictionService } from './padhdisplaydevicehealthprediction.service';

describe('PadhdisplaydevicehealthpredictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PadhdisplaydevicehealthpredictionService]
    });
  });

  it('should be created', inject([PadhdisplaydevicehealthpredictionService], (service: PadhdisplaydevicehealthpredictionService) => {
    expect(service).toBeTruthy();
  }));
});
