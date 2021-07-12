import { TestBed, inject } from '@angular/core/testing';

import { TroubleticketService } from './troubleticket.service';

describe('TroubleticketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TroubleticketService]
    });
  });

  it('should be created', inject([TroubleticketService], (service: TroubleticketService) => {
    expect(service).toBeTruthy();
  }));
});
