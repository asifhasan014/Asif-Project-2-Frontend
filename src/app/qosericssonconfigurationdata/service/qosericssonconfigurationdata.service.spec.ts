import { TestBed, inject } from '@angular/core/testing';

import { QosericssonconfigurationdataService } from './qosericssonconfigurationdata.service';

describe('QosericssonconfigurationdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QosericssonconfigurationdataService]
    });
  });

  it('should be created', inject([QosericssonconfigurationdataService], (service: QosericssonconfigurationdataService) => {
    expect(service).toBeTruthy();
  }));
});
