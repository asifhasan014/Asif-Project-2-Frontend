import { TestBed, inject } from '@angular/core/testing';

import { QosradioqualityericssonService } from './qosradioqualityericsson.service';

describe('QosradioqualityericssonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QosradioqualityericssonService]
    });
  });

  it('should be created', inject([QosradioqualityericssonService], (service: QosradioqualityericssonService) => {
    expect(service).toBeTruthy();
  }));
});
