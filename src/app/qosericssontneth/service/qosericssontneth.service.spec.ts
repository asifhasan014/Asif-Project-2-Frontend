import { TestBed, inject } from '@angular/core/testing';

import { QosericssontnethService } from './qosericssontneth.service';

describe('QosericssontnethService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QosericssontnethService]
    });
  });

  it('should be created', inject([QosericssontnethService], (service: QosericssontnethService) => {
    expect(service).toBeTruthy();
  }));
});
