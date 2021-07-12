import { TestBed, inject } from '@angular/core/testing';

import { QosconfigurationstandardService } from './qosconfigurationstandard.service';

describe('QosconfigurationstandardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QosconfigurationstandardService]
    });
  });

  it('should be created', inject([QosconfigurationstandardService], (service: QosconfigurationstandardService) => {
    expect(service).toBeTruthy();
  }));
});
