import { TestBed, inject } from '@angular/core/testing';

import { PadhdisplaydevicepredService } from './padhdisplaydevicepred.service';

describe('PadhdisplaydevicepredService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PadhdisplaydevicepredService]
    });
  });

  it('should be created', inject([PadhdisplaydevicepredService], (service: PadhdisplaydevicepredService) => {
    expect(service).toBeTruthy();
  }));
});
