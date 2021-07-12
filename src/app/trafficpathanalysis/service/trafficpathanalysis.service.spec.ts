import { TestBed, inject } from '@angular/core/testing';

import { TrafficpathanalysisService } from './trafficpathanalysis.service';

describe('TrafficpathanalysisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrafficpathanalysisService]
    });
  });

  it('should be created', inject([TrafficpathanalysisService], (service: TrafficpathanalysisService) => {
    expect(service).toBeTruthy();
  }));
});
