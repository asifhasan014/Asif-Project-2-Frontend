import { TestBed, inject } from '@angular/core/testing';

import { HuaweirsltslService } from './huaweirsltsl.service';

describe('HuaweirsltslService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HuaweirsltslService]
    });
  });

  it('should be created', inject([HuaweirsltslService], (service: HuaweirsltslService) => {
    expect(service).toBeTruthy();
  }));
});
