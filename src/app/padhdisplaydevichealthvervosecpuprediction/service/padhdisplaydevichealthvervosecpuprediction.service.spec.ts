import { TestBed, inject } from '@angular/core/testing';

import { PadhdisplaydevichealthvervosecpupredictionService } from './padhdisplaydevichealthvervosecpuprediction.service';

describe('PadhdisplaydevichealthvervosecpupredictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PadhdisplaydevichealthvervosecpupredictionService]
    });
  });

  it('should be created', inject([PadhdisplaydevichealthvervosecpupredictionService], (service: PadhdisplaydevichealthvervosecpupredictionService) => {
    expect(service).toBeTruthy();
  }));
});
