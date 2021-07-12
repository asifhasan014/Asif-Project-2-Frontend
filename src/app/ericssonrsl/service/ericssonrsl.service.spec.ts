import { TestBed, inject } from '@angular/core/testing';

import { EricssonrslService } from './ericssonrsl.service';

describe('EricssonrslService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EricssonrslService]
    });
  });

  it('should be created', inject([EricssonrslService], (service: EricssonrslService) => {
    expect(service).toBeTruthy();
  }));
});
