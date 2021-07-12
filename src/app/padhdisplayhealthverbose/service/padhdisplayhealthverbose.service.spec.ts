import { TestBed, inject } from '@angular/core/testing';

import { PadhdisplayhealthverboseService } from './padhdisplayhealthverbose.service';

describe('PadhdisplayhealthverboseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PadhdisplayhealthverboseService]
    });
  });

  it('should be created', inject([PadhdisplayhealthverboseService], (service: PadhdisplayhealthverboseService) => {
    expect(service).toBeTruthy();
  }));
});
