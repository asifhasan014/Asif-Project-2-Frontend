import { TestBed, inject } from '@angular/core/testing';

import { TrafficpathkpireportService } from './trafficpathkpireport.service';

describe('TrafficpathkpireportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrafficpathkpireportService]
    });
  });

  it('should be created', inject([TrafficpathkpireportService], (service: TrafficpathkpireportService) => {
    expect(service).toBeTruthy();
  }));
});
